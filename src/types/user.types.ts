import { loginReqSchema } from "@/schemas/login.schema"
import { registerValidationSchema, resetPasswordEmailReqSchema, resetPasswordReqSchema, userSchema, usersReqSchema, usersUpdateReqSchema } from "@/schemas/users.schema"
import { ReactNode } from "react"
import { z } from "zod"

export type TLoginReq = z.infer<typeof loginReqSchema>

export type TUserReq = z.infer<typeof usersReqSchema>

export type TuserUpdateReq = z.infer<typeof usersUpdateReqSchema>

export type TValidationSchema = z.infer<typeof registerValidationSchema>

export interface TAddressRes {
    id: string,
    zipCode: string,
    state: string,
    city: string,
    street: string,
    number: string,
    complement?: string
}

export interface TUserRes {
    id: string,
    name: string,
    email: string,
    cpf: string,
    phone: string,
    birthdate: string,
    profileImg: string,
    isAdvertiser: boolean,
    address: TAddressRes,
    description: string,
    createdAt: Date,
}

export type TProviderProps = {
  children: ReactNode
}

export type TLoginRes = {
  token: string
}

export type TResetPasswordEmailReq= z.infer<typeof resetPasswordEmailReqSchema>
export type TResetPasswordReq = z.infer<typeof resetPasswordReqSchema>
export type TUser = z.infer<typeof userSchema>