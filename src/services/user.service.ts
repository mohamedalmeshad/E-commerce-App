import { UpdatePasswordData, UpdateUserProfileData } from "@/interfaces";
import { ENDPOINTS } from "./api.config";

export const userService = {
    async updateProfile(data: UpdateUserProfileData, token: string) {
        const response = await fetch(ENDPOINTS.USER.UPDATE_PROFILE, {
            method: "PUT",
            headers: {
                token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    async updatePassword(data: UpdatePasswordData, token: string) {
        const response = await fetch(ENDPOINTS.USER.UPDATE_PASSWORD, {
            method: "PUT",
            headers: {
                token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
};
