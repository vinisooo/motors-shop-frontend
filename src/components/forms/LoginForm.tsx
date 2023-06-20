"use client"

import "../../styles/components/forms/loginForm.sass"
import { loginReqSchema } from "@/schemas/login.schema"
import { TLoginReq } from "@/types/user.types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "../button/button"
import { useAuthContext } from "@/context/authContext"

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TLoginReq>({
        resolver: zodResolver(loginReqSchema)
    })

    const { login } = useAuthContext()

    const onLoginSubmit: SubmitHandler<TLoginReq> = async (data) => {
        await login(data, () => {
          reset()
        })
    }

    return (
        <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onLoginSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" {...register("email")}/>
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" {...register("password")}/>
                    {errors.password && <p>{errors.password.message}</p>}
                    <Link href={"/"}>
                        Esqueci minha senha
                    </Link>
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
    )
}

export default LoginForm