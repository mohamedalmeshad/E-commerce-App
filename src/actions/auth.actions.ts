"use server"
import { resetPasswordData, signupUserData, SignupOrUpdatePasswordResponse, ForgotPasswordResponse } from "@/interfaces";
import { authService } from "@/services/auth.service";

export async function signupAction(userData: signupUserData): Promise<SignupOrUpdatePasswordResponse> {
    const data = await authService.signup(userData);
    return data;
}

export async function forgotPasswordAction(email: string): Promise<ForgotPasswordResponse> {
    const data = await authService.forgotPassword(email);
    return data;
}

export async function verifyResetCodeAction(resetCode: string): Promise<{ status: string; message?: string }> {
    const data = await authService.verifyResetCode(resetCode);
    return data;
}

export async function resetPasswordAction(data: resetPasswordData): Promise<{ token?: string; message?: string }> {
    const resData = await authService.resetPassword(data);
    return resData;
}
