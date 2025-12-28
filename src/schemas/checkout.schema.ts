import { z } from "zod";

/** Schema for the checkout process */
export const checkoutSchema = z.object({
    city: z.string().nonempty("City is required"),
    details: z.string().min(3, "Address details are required"),
    phone: z.string().nonempty().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});
