import { z } from "zod";

export const addressReqSchema = z.object({
    zipCode: z.string().min(8).max(8),
    state: z.string().min(2).max(2),
    city: z.string().max(25),
    street: z.string().max(40),
    number: z.string(),
    complement: z.string().max(128).nullable()
})

export const addressReqUpdateSchema = addressReqSchema.partial()

