import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/cart", '/allorders', '/profile', '/profile/addresses', '/wishlist', '/profile/edit'];
const authPages = ['/auth/login', '/auth/signup','/auth/forgot-password','/auth/reset-password','/auth/verify-email'];

export default async function proxy(reg: NextRequest) {
    const token = await getToken({ req: reg });
    if (protectedPages.includes(reg.nextUrl.pathname)) {

        if (token) {
            return NextResponse.next();
        } else {
            const redirectUrl = new URL("/auth/login", process.env.NEXT_URL);
            redirectUrl.searchParams.set("reason", "unauthorized");
            return NextResponse.redirect(redirectUrl);
        }
    }
    if (authPages.includes(reg.nextUrl.pathname)) {
        if (!token) {
            return NextResponse.next();
        } else {
            const redirectUrl = new URL("/", process.env.NEXT_URL);
            return NextResponse.redirect(redirectUrl);
        }
    }
    return NextResponse.next();
}

