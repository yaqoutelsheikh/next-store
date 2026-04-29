'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useActionState} from "react";
import {signUpUser} from "@/lib/actions/user.actions";
import {useSearchParams} from "next/navigation";
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field";

const SignUpForm = () => {
    // الترتيب: الحالة الحالية، الدالة التي نربطها بالفورم، حالة التحميل
    const [state, action, isPending] = useActionState(signUpUser, {});
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || '/';
    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl}/>
            <div className="space-y-2">
                <Field data-invalid={!!state.errors?.name}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input id="name" name="name" aria-invalid={!!state.errors?.name}
                           defaultValue={state.formData?.name}
                    />
                    {state.errors?.name && (
                        <FieldDescription className="text-destructive">
                            {Array.isArray(state.errors.name)
                                ? state.errors.name[0]
                                : state.errors.name}
                        </FieldDescription>
                    )}
                </Field>
                <Field data-invalid={!!state.errors?.email}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" name="email" type={'email'} aria-invalid={!!state.errors?.email}
                           defaultValue={state.formData?.email}
                    />
                    {state.errors?.email && (
                        <FieldDescription className="text-destructive">
                            {Array.isArray(state.errors.name)
                                ? state.errors.email[0]
                                : state.errors.email}
                        </FieldDescription>
                    )}
                </Field>
                <Field data-invalid={!!state.errors?.password}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" name="password" type={'password'} aria-invalid={!!state.errors?.password}
                           defaultValue={state.formData?.password}
                    />
                    {state.errors?.password && (
                        <FieldDescription className="text-destructive">
                            {Array.isArray(state.errors.password)
                                ? state.errors.password[0]
                                : state.errors.password}
                        </FieldDescription>
                    )}
                </Field>
                <Field data-invalid={!!state.errors?.confirmPassword}>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <Input id="confirmPassword" name="confirmPassword" type={'password'}
                           aria-invalid={!!state.errors?.confirmPassword}
                           defaultValue={state.formData?.confirmPassword}
                    />
                    {state.errors?.confirmPassword && (
                        <FieldDescription className="text-destructive">
                            {Array.isArray(state.errors.confirmPassword)
                                ? state.errors.confirmPassword[0]
                                : state.errors.confirmPassword}
                        </FieldDescription>
                    )}
                </Field>

                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full bg-primary-gradient rounded"
                >
                    {isPending ? 'Submitting...' : 'Sign Up'}
                </Button>
            </div>

            {/*<div className={'space-y-6'}>*/}
            {/*    <div>*/}
            {/*        <Label htmlFor="name">Name</Label>*/}
            {/*        <Input*/}
            {/*            className={'rounded'}*/}
            {/*            id='name'*/}
            {/*            name="name"*/}
            {/*            type='text'*/}
            {/*            autoComplete='name'*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <Label htmlFor="email">Email</Label>*/}
            {/*        <Input*/}
            {/*            className={'rounded'}*/}
            {/*            id='email'*/}
            {/*            name="email"*/}
            {/*            type='email'*/}
            {/*            required*/}
            {/*            autoComplete='email'*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <Label htmlFor="password">Password</Label>*/}
            {/*        <Input*/}
            {/*            className={'rounded'}*/}
            {/*            id='password'*/}
            {/*            name="password"*/}
            {/*            type='password'*/}
            {/*            required*/}
            {/*            autoComplete='password'*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <Label htmlFor="confirmPassword">Confirm password</Label>*/}
            {/*        <Input*/}
            {/*            className={'rounded'}*/}
            {/*            id='confirmPassword'*/}
            {/*            name="confirmPassword"*/}
            {/*            type='password'*/}
            {/*            required*/}
            {/*            autoComplete='confirmPassword'*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div>*/}
            {/*        /!* استخدم isPending مباشرة هنا لتعطيل الزر وتغيير النص *!/*/}
            {/*        <Button*/}
            {/*            disabled={isPending}*/}
            {/*            type="submit"*/}
            {/*            className="w-full bg-primary-gradient rounded"*/}
            {/*        >*/}
            {/*            {isPending ? 'Submitting...' : 'Sign Up'}*/}
            {/*        </Button>*/}
            {/*    </div>*/}

            {/*    /!* التحقق من وجود رسالة خطأ في الـ state *!/*/}
            {/*    /!*{state && !state.success && state.message && (*!/*/}
            {/*    /!*    <div className={'text-center text-destructive'}>*!/*/}
            {/*    /!*        {state.message}*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*)}*!/*/}

            {/*    <div className={'text-sm text-center text-muted-foreground '}>*/}
            {/*        Already have an account? {' '}*/}
            {/*        <Link href={'/sign-in'} target={'_self'} className={'link'}>Sign In</Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </form>
    );
}

export default SignUpForm;