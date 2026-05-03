// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest) => {
    const { nextUrl, cookies } = req;
    const res = NextResponse.next();

    // توليد معرف السلة إذا لم يكن موجوداً
    if (!cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();
        res.cookies.set("sessionCartId", sessionCartId);
    }

    return res;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};