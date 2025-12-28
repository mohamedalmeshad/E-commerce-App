"use server"
import { getUserToken } from "@/app/helpers/getUserToken";
import { SignupOrUpdatePasswordResponse, UpdatePasswordData, UpdateUserProfileData, UpdateUserProfileDataResponse } from "@/interfaces";
import { userService } from "@/services/user.service";

export async function updateUserProfileAction(data: UpdateUserProfileData): Promise<UpdateUserProfileDataResponse> {
    const token = await getUserToken();
    const resData = await userService.updateProfile(data, token);
    return resData;
}

export async function updatePasswordAction(data: UpdatePasswordData): Promise<SignupOrUpdatePasswordResponse> {
    const token = await getUserToken();
    const resData = await userService.updatePassword(data, token);
    return resData;
}
