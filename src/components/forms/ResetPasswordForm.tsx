"use client"

import "../../styles/components/forms/loginForm.sass"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "../button/button"
import { Input } from "../inputs/inputs"
import { resetPasswordReqSchema } from "@/schemas/users.schema"
import { TResetPasswordReq } from "@/types/user.types"
import { useUserContext } from "@/context/userContext"


interface IResetPasswordFormProps{
    token: string
}


const ResetPasswordForm = ({token}: IResetPasswordFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TResetPasswordReq>({
        resolver: zodResolver(resetPasswordReqSchema)
    })

    const { resetPassword, existantUser } = useUserContext()

    const resetPasswordSubmit: SubmitHandler<TResetPasswordReq> = async (data) => {
        resetPassword(data, token)
    }

    return (
        <>
            <div className="login-form">
                <h1>Redefinição de senha</h1>
                <form onSubmit={handleSubmit(resetPasswordSubmit)}>
                    <div>
                        <Input type="password" id="password" register={register("password")}>Senha</Input>
                        {errors.password && <span className="error">{errors.password.message}</span>}
                    </div>
                    <div>
                        <Input type="password" id="confirm-password" register={register("confirmPassword")}>Confirmar senha</Input>
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                        {
                            !existantUser &&
                            <span className="error">Sua senha já foi alterada.</span>
                        }
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