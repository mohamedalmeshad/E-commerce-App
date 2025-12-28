'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(): Promise<string> {
    const nextToken = (await cookies()).get('next-auth.session-token')?.value;
    const apiToken = await decode({ token: nextToken, secret: process.env.NEXTAUTH_SECRET! })
    return (apiToken?.token as string) || "";
}