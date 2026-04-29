'use server';
import {SignInFormSchema} from "@/lib/validators";
import {SignUpFormSchema} from "@/lib/validators";
import {signIn, signOut} from "@/auth";
import {isRedirectError} from "next/dist/client/components/redirect-error";
import {hashSync} from "bcrypt-ts-edge";
import {prisma} from "@/db/prisma";
import {SignUpFormState} from "@/lib/constants";

export async function signInWithCredentials(prevState: unknown, formData: FormData) {


    try {
        const validatedFields = SignInFormSchema.safeParse({ // استخدم safeParse
            email: formData.get('email'),
            password: formData.get('password')
        });

        // if (!validatedFields.success) {
        //     return {
        //         success: false,
        //         message: validatedFields.error.message // أول رسالة خطأ من Zod
        //     };
        // }

        await signIn('credentials', {...validatedFields.data, redirect: true});
        return {success: true, message: "Signed in Successfully"};

    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        return {success: false, message: "Invalid email or password"};
    }
}

// Sign user out

export async function signOutUser() {

    await signOut();
}

// Sign Up user

export async function signUpUser(prevState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
    try {
        const result = SignUpFormSchema.safeParse(
            Object.fromEntries(formData.entries())
        );
        const rawData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        };
        if (!result.success) {
            console.log(result.error);
            return {
                errors: result.error.flatten().fieldErrors,
                formData: rawData
            }
        }
        const {name, email, password} = result.data;
        const userExists = await prisma.user.findUnique({
            where: {email}
        });


        if (userExists) {
            return {
                errors: {
                    email: ['Email already exists']
                },
                formData: rawData
            }
        }

        const hashedPassword = hashSync(password, 10);

        // 4. إنشاء المستخدم
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        await signIn('credentials', {email, password});

        return {message: "User registered successfully"};

    } catch (error) {
        if (isRedirectError(error)) throw error;
        return {  message: "Something went wrong during registration" };
    }
}