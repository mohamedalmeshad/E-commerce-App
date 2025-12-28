import { resetPasswordData, signInData, signupUserData } from "@/interfaces";
import { ENDPOINTS } from "./api.config";

export const authService = {
    async login(credentials: signInData) {
        const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        return response.json();
    },

    async signup(userData: signupUserData) {
        const response = await fetch(ENDPOINTS.AUTH.SIGNUP, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return response.json();
    },

    async forgotPassword(email: string) {
        const response = await fetch(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        return response.json();
    },

    async verifyResetCode(resetCode: string) {
        const response = await fetch(ENDPOINTS.AUTH.VERIFY_RESET_CODE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resetCode }),
        });
        return response.json();
    },

    async resetPassword(data: resetPasswordData) {
        const response = await fetch(ENDPOINTS.AUTH.RESET_PASSWORD, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    async verifyToken(token: string) {
        const response = await fetch(ENDPOINTS.AUTH.VERIFY_TOKEN, {
            headers: { token },
        });
        return response.json();
    }
};
