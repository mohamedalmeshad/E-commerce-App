import { z } from "zod";

/** Schema for adding a new user address */
export const addressSchema = z.object({
    name: z.string().nonempty("Address name is required"),
    city: z.string().nonempty("City is required"),
    details: z.string().nonempty().min(3, "Detailed address is required"),
    phone: z.string().nonempty().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});
