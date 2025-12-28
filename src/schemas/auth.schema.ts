import { z } from "zod";

/** Schema for user registration */
export const signUpSchema = z.object({
    name: z.string().nonempty("Identity name is required").min(3, "Name too short"),
    email: z
        .string()
        .nonempty("Email is required")
        .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Invalid email form (eg. user@example.com)"
        ),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be 8+ units")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Key must be complex (Aa1@)"
        ),
    rePassword: z.string().nonempty("Confirmation key is required"),
    phone: z
        .string()
        .nonempty("Comms link (phone) is required")
        .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian frequency (phone)"),
}).refine((data) => data.password === data.rePassword, {
    message: "Security keys do not match",
    path: ["rePassword"],
});

/** Schema for user login */
export const LoginSchema = z.object({
    email: z.string().email("Invalid email matrix, Ex. example@domain.com"),
    password: z.string().min(1, "Password credential is required"),
});

/** Schema for forgot password request */
export const ForgotPasswordSchema = z.object({
    email: z.string().email("Invalid email matrix, Ex. operative@network.com"),
});

/** Schema for email verification code */
export const VerifyEmailSchema = z.object({
    resetCode: z.string().length(6, "Invalid security code protocol"),
});

/** Schema for password reset */
export const ResetPasswordSchema = z.object({
    email: z.string().email("Invalid email matrix, Ex. operative@network.com"),
    newPassword: z
        .string()
        .nonempty("New access key required")
        .min(8, "Security key must be 8+ units")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Key must be complex (Aa1@)"
        ),
});
