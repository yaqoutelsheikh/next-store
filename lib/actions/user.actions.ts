'use server';
import {SignInFormSchema} from "@/lib/validators";
import {signIn, signOut} from "@/auth";
import {isRedirectError} from "next/dist/client/components/redirect-error";

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

        await signIn('credentials', { ...validatedFields.data, redirect: true });
        return { success: true, message: "Signed in Successfully" };

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