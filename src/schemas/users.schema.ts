import { z } from "zod";
import { addressReqSchema } from "./address.schema";

export const usersReqSchema = z.object({
    name: z.string().max(60),
    email: z.string().email().max(60),
    password: z.string().min(8).max(60).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!*$&@#])[0-9a-zA-Z?!*$&@#]{8,}$/),
    cpf: z.string().min(11).max(11),
    phone: z.string(),
    birthdate: z.string(),
    profileImg: z.string().url().optional(),
    isAdvertiser: z.boolean(),
    address: addressReqSchema,
    description: z.string().nullable()
})

export const registerValidationSchema = usersReqSchema.extend({
    confirmPassword: z.string(),
}).refine(
    (data) => data.password === data.confirmPassword, {
      message: "Password and confirmation don't match",
      path: ["confirmPassword"]
    }
)

export const usersUpdateReqSchema = usersReqSchema.partial()