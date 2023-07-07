"use client"

import { registerValidationSchema } from "@/schemas/users.schema"
import { TValidationSchema } from "@/types/user.types"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import "../../styles/components/forms/registerForm.sass"
import Button from "../button/button"
import { useUserContext } from "@/context/userContext"
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
    const [isAdvertiser, setIsAdvertiser] = useState<boolean | null>(null)

    const [state, setState] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [street, setStreet] = useState<string>("")
    const [complement, setComplement] = useState<string>("")


    const { registerUser } = useUserContext()

    const onSubmitRegister: SubmitHandler<any> = async (data) => {
        data.address = {
            ...data.address,
            city: city || data.address.city,
            state: state || data.address.state,
            street: street || data.address.street,
            complement: complement || data.address.complement
        }
        await registerUser(data)
    }
    console.log("erros:", errors)

    const setNotAdvertiser = () => {
        setValue("isAdvertiser", false)
        setIsAdvertiser(false)
    }

    const setAdvertiser = () => {
        setValue("isAdvertiser", true)
        setIsAdvertiser(true)
    }

    const onInputCep = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value

        e.target.value = cep.slice(0, 8)
        if(cep.length === 8){
            getCepAddress(cep)
        }
    }

    const getCepAddress = async(cep: string) => {
        try{
            const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

            const response = await request.json()
            setState(response.uf)
            setCity(response.localidade)
            setStreet(response.logradouro)
            setComplement(response.complement)
        }catch(err: unknown){
            console.log(err)
        }
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
                    <textarea maxLength={300} id="description" {...register("description")}/>
                    {errors.description && <span className="error">{errors.description.message}</span>}
                </div>
                <h1>Informações de endereço</h1>
                <div>
                    <label htmlFor="zipCode">CEP</label>
                    <input type="number" onInput={onInputCep} id="zipCode" {...register("address.zipCode")}/>
                    {errors.address?.zipCode && <span className="error">{errors.address?.zipCode.message}</span>}
                </div>
                <div className="flex-horizontal">
                    <div>
                        <label htmlFor="state">Estado</label>
                        <input value={state} type="text" id="state" maxLength={2} {...register("address.state")} onChange={(e) => setState(e.target.value)}/>
                        {errors.address?.state && <span className="error">{errors.address?.state.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="city">Cidade</label>
                        <input maxLength={100} value={city} type="text" id="city" {...register("address.city")} onChange={(e) => setCity(e.target.value)}/>
                        {errors.address?.city && <span className="error">{errors.address?.city.message}</span>}
                    </div>
                </div>
                <div>
                    <label htmlFor="street">Rua</label>
                    <input maxLength={100} type="text" id="street" {...register("address.street")}/>
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
                        <input value={complement} type="text" id="complement" {...register("address.complement")} onChange={(e)=>setComplement(e.target.value)}/>
                        {errors.address?.complement && <span className="error">{errors.address?.complement.message}</span>}
                    </div>
                </div>
                <h1>Tipo de conta</h1>
                <div className="flex-horizontal">
                    <Button type="button" Style={isAdvertiser === false ? "brand-1" : "negative-1"} onClick={setNotAdvertiser}>
                        Comprador      
                    </Button>
                    <Button type="button" Style={isAdvertiser ? "brand-1" : "negative-1"} onClick={setAdvertiser}>
                        Anunciante
                    </Button>
                </div>
                    {errors.isAdvertiser && <span className="error">Selecione o tipo da sua conta</span>}
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