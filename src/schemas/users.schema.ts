import { z } from "zod"
import { addressReqSchema } from "./address.schema"

export const usersReqSchema = z.object({
    name: z.string().max(60),
    email: z.string().email("Email inválido").max(60, "Seu email deve conter no máximo 60 caracteres"),
    password: z
      .string()
      .min(8, "A senha deve conter pelo menos 8 caracteres.")
      .max(60, "A senha deve conter pelo menos 8 caracteres.")
      .regex(/^(?=.*\d)/, "A senha deve conter pelo menos um dígito numérico.")
      .regex(/^(?=.*[a-z])/, "A senha deve conter pelo menos uma letra minúscula.")
      .regex(/^(?=.*[A-Z])/, "A senha deve conter pelo menos uma letra maiúscula.")
      .regex(/^(?=.*[?!*$&@#])/, "A senha deve conter pelo menos um dos seguintes caracteres especiais: ?!*$&@#.")
      .regex(/^[0-9a-zA-Z?!*$&@#]{8,}$/, "A senha deve ter no mínimo 8 caracteres."),
    cpf: z.string().min(11, "Seu CPF deve conter exatamente 11 caracteres").max(11, "Seu CPF deve conter exatamente 11 caracteres"),
    phone: z.string().min(11, "Seu número de telefone deve conter exatamente 11 caracteres").max(11, "Seu número de telefone deve conter exatamente 11 caracteres"),
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
      message: "Confirmação incorreta",
      path: ["confirmPassword"]
    }
)

export const resetPasswordEmailReqSchema = z.object({
    email: z.string().email("Email inválido").max(60, "Seu Email deve conter no máximo 60 caracteres"),
})

export const resetPasswordReqSchema = usersReqSchema.omit({
    name: true,
    email: true,
    cpf: true,
    phone: true,
    birthdate: true,
    profileImg: true,
    isAdvertiser: true,
    address: true,
    description: true
}).extend({
    confirmPassword: z.string(),
    }).refine(
        (data) => data.password === data.confirmPassword, {
        message: "Confirmação incorreta",
        path: ["confirmPassword"]
    }
)
    

export type TResetPasswordEmailReq= z.infer<typeof resetPasswordEmailReqSchema>
export type TResetPasswordReq = z.infer<typeof resetPasswordReqSchema>
export const usersUpdateReqSchema = usersReqSchema.partial()