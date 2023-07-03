"use client"

import { registerValidationSchema } from "@/schemas/users.schema"
import { TValidationSchema } from "@/types/user.types"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import "../../styles/components/forms/registerForm.sass"
import Button from "../button/button"
import { useAuthContext } from "@/context/authContext"
import React, { useState } from "react"

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<TValidationSchema>({
        resolver: zodResolver(registerValidationSchema)
    })
    const [isAdvertiser, setIsAdvertiser] = useState<boolean>(false)

    const { registerUser } = useAuthContext()

    const onSubmitRegister: SubmitHandler<any> = async (data) => {
      await registerUser(data)
    }

    const setNotAdvertiser = () => {
        setValue("isAdvertiser", false)
        setIsAdvertiser(false)
    }

    const setAdvertiser = () => {
        setValue("isAdvertiser", true)
        setIsAdvertiser(true)
    }

    return(
        <div className="register-form">
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit(onSubmitRegister)}>
                <h1>Informações pessoais</h1>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" {...register("name")}/>
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" {...register("email")}/>
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="cpf">CPF</label>
                    <input type="number" onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.slice(0, 11)} id="cpf" {...register("cpf")}/>
                    {errors.cpf && <span className="error">{errors.cpf.message}</span>}
                </div>
                <div>
                    <label htmlFor="phone">Celular</label>
                    <input type="number" onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.slice(0, 11)} id="phone" {...register("phone")}/>
                    {errors.phone && <span className="error">{errors.phone.message}</span>}
                </div>
                <div>
                    <label htmlFor="birthdate">Data de nascimento</label>
                    <input type="date" id="birthdate" {...register("birthdate")}/>
                    {errors.birthdate && <span className="error">{errors.birthdate.message}</span>}
                </div>
                <div>
                    <label htmlFor="description">Descrição</label>
                    <textarea id="description" {...register("description")}/>
                    {errors.description && <span className="error">{errors.description.message}</span>}
                </div>
                <h1>Informações de endereço</h1>
                <div>
                    <label htmlFor="zipCode">CEP</label>
                    <input type="number" onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.slice(0, 8)} id="zipCode" {...register("address.zipCode")}/>
                    {errors.address?.zipCode && <span className="error">{errors.address?.zipCode.message}</span>}
                </div>
                <div className="flex-horizontal">
                    <div>
                        <label htmlFor="state">Estado</label>
                        <input type="text" id="state" {...register("address.state")}/>
                        {errors.address?.state && <span className="error">{errors.address?.state.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="city">Cidade</label>
                        <input type="text" id="city" {...register("address.city")}/>
                        {errors.address?.city && <span className="error">{errors.address?.city.message}</span>}
                    </div>
                </div>
                <div>
                    <label htmlFor="street">Rua</label>
                    <input type="text" id="street" {...register("address.street")}/>
                    {errors.address?.street && <span className="error">{errors.address?.street.message}</span>}
                </div>
                <div className="flex-horizontal">
                    <div>
                        <label htmlFor="number">Número</label>
                        <input type="number" id="number" {...register("address.number")}/>
                        {errors.address?.number && <span className="error">{errors.address?.number.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="complement">Complemento</label>
                        <input type="text" id="complement" {...register("address.complement")}/>
                        {errors.address?.complement && <span className="error">{errors.address?.complement.message}</span>}
                    </div>
                </div>
                <h1>Tipo de conta</h1>
                <div className="flex-horizontal">
                    <Button type="button" Style={!isAdvertiser ? "brand-1" : "negative-1"} onClick={setNotAdvertiser}>
                        Comprador      
                    </Button>
                    <Button type="button" Style={isAdvertiser ? "brand-1" : "negative-1"} onClick={setAdvertiser}>
                        Anunciante
                    </Button>
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" {...register("password")}/>
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input type="password" id="confirmPassword" {...register("confirmPassword")}/>
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                </div>
                <Button type={"submit"}>
                    Finalizar cadastro
                </Button>
            </form>
        </div>
    )
}

export default RegisterForm