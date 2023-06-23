"use client"

import "../../styles/components/forms/loginForm.sass"
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

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TLoginReq>({
        resolver: zodResolver(loginReqSchema)
    })

    const { resetPasswordModal, setResetPasswordModal } = useContext(ModalContext)

    const { login } = useAuthContext()

    const onLoginSubmit: SubmitHandler<TLoginReq> = async (data) => {
        await login(data, () => {
          reset()
        })
    }

    return (
        <>
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onLoginSubmit)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" {...register("email")}/>
                        {errors.email && <span className="error">{errors.email.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" {...register("password")}/>
                        {errors.password && <span className="error">{errors.password.message}</span>}
                        <button className="reset-password-btn" type="button" onClick={() => {setResetPasswordModal(true)}}>
                            Esqueci minha senha
                        </button>
                    </div>
                    <Button type="submit">
                        Entrar
                    </Button>
                </form>
                <h3>
                    Ainda não possui conta?
                </h3>
                <Link href={"/"}>
                    <Button type="submit" style="outline-2">
                        Cadastrar
                    </Button>
                </Link>
            </div>
            {
                resetPasswordModal && 
                <ResetPasswordModal/>
            }
        </>
    )
}

export default LoginForm