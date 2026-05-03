// auth.config.ts
import { NextResponse } from "next/server";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/sign-in',
        newUser: '/sign-up',
        error: '/sign-in'
    },
    providers: [], // مصفوفة فارغة هنا، تملأ في ملف auth.ts
    callbacks: {
        authorized({ request, auth }: any) {
            // 1. منطق توليد معرف السلة (Cart ID)
            if (!request.cookies.get('sessionCartId')) {
                const sessionCartId = crypto.randomUUID();
                const newRequestHeaders = new Headers(request.headers);

                const response = NextResponse.next({
                    request: {
                        headers: newRequestHeaders
                    }
                });

                response.cookies.set('sessionCartId', sessionCartId);
                return response;
            }

            // 2. منطق حماية المسارات (اختياري)
            // يمكنك هنا التحقق من auth لمعرفة هل المستخدم مسجل دخول أم لا
            return true;
        }
    }
} satisfies NextAuthConfig;