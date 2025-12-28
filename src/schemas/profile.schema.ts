import { z } from "zod";

/** Schema for updating user profile details */
export const EditProfileSchema = z.object({
    name: z.string().nonempty("Identity name is required").min(3, "Name too short"),
    email: z
        .string()
        .nonempty("Email is required")
        .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Invalid email form (eg. user@example.com)"
        ),
    phone: z.string().nonempty("Phone is required").min(11, "Phone needs 11 number").max(11, "Phone max 11 number"),
});

/** Schema for updating user password */
export const UpdatePasswordSchema = z.object({
    currentPassword: z.string().min(6, "Current password is required"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[^a-zA-Z0-9]/, "Password must contain a symbol"),
    rePassword: z.string()
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
});
