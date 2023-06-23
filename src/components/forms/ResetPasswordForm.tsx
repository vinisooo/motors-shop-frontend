"use client"

import "../../styles/components/forms/resetPasswordForm.sass"
import { loginReqSchema } from "@/schemas/login.schema"
import { TLoginReq } from "@/types/user.types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "../button/button"
import { useAuthContext } from "@/context/authContext"
import { useContext } from "react"
import { ModalContext } from "@/context/modalContext"
import ResetPasswordModal from "../modals/resetPasswordModal"
import { Input } from "../inputs/inputs"
import { TResetPasswordReq, resetPasswordReqSchema } from "@/schemas/users.schema"

interface iResetPasswordFormProps{
    token: string
}

const ResetPasswordForm = ({token}: iResetPasswordFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TResetPasswordReq>({
        resolver: zodResolver(resetPasswordReqSchema)
    })

    const resetPasswordSubmit: SubmitHandler<TResetPasswordReq> = async (data) => {
        console.log(data, token)
    }

    return (
        <>
            <div className="reset-password-form">
                <h1>Redefinição de senha</h1>
                <form onSubmit={handleSubmit(resetPasswordSubmit)}>
                    <div>
                        <Input type="password" id="password" rest={register("password")}>Senha</Input>
                        {errors.password && <span className="error">{errors.password.message}</span>}
                    </div>
                    <div>
                        <Input type="password" id="confirm-password" rest={register("confirmPassword")}>Confirmar senha</Input>
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                    </div>
                    <Button type="submit">
                        Redefinir senha
                    </Button>
                </form>
            </div>
        </>
    )
}

export default ResetPasswordForm