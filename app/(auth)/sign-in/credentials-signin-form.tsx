'use client';

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SignInDefaultValues} from "@/lib/constants";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useActionState} from "react";
import {signInWithCredentials} from "@/lib/actions/user.actions";
import {useSearchParams} from "next/navigation";

const CredentialsSignInForm = () => {
    // الترتيب: الحالة الحالية، الدالة التي نربطها بالفورم، حالة التحميل
    const [state, action, isPending] = useActionState(signInWithCredentials, {
        success: false,
        message: '',
    });
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || '/';
    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className={'space-y-6'}>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        className={'rounded'}
                        id='email'
                        name="email"
                        type='email'
                        required
                        autoComplete='email'
                        defaultValue={SignInDefaultValues.email}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        className={'rounded'}
                        id='password'
                        name="password"
                        type='password'
                        required
                        autoComplete='password'
                        defaultValue={SignInDefaultValues.password}
                    />
                </div>

                <div>
                    {/* استخدم isPending مباشرة هنا لتعطيل الزر وتغيير النص */}
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full bg-primary-gradient rounded"
                    >
                        {isPending ? 'Signing In...' : 'Sign In'}
                    </Button>
                </div>

                {/* التحقق من وجود رسالة خطأ في الـ state */}
                {state && !state.success && state.message && (
                    <div className={'text-center text-destructive'}>
                        {state.message}
                    </div>
                )}

                <div className={'text-sm text-center text-muted-foreground '}>
                    Don&apos;t have an account? {' '}
                    <Link href={'/sign-up'} target={'_self'} className={'link'}>Sign Up</Link>
                </div>
            </div>
        </form>
    );
}

export default CredentialsSignInForm;