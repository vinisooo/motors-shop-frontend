"use client"

import { registerValidationSchema } from "@/schemas/users.schema"
import { TValidationSchema } from "@/types/user.types"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import "../../styles/components/forms/registerForm.sass"
import Button from "../button/button"
import { useAuthContext } from "@/context/authContext"

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<TValidationSchema>({
        resolver: zodResolver(registerValidationSchema)
    })

    const { registerUser } = useAuthContext()

    const onSubmitRegister: SubmitHandler<any> = async (data) => {
      await registerUser(data)
    }

    return(
        <div className="register-form">
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit(onSubmitRegister)}>
                <h1>Informações pessoais</h1>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" {...register("name")}/>
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" {...register("email")}/>
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" {...register("cpf")}/>
                    {errors.cpf && <p>{errors.cpf.message}</p>}
                </div>
                <div>
                    <label htmlFor="phone">Celular</label>
                    <input type="text" id="phone" {...register("phone")}/>
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>
                <div>
                    <label htmlFor="birthdate">Data de nascimento</label>
                    <input type="date" id="birthdate" {...register("birthdate")}/>
                    {errors.birthdate && <p>{errors.birthdate.message}</p>}
                </div>
                <div>
                    <label htmlFor="description">Descrição</label>
                    <textarea id="description" {...register("description")}/>
                    {errors.description && <p>{errors.description.message}</p>}
                </div>
                <h1>Informações de endereço</h1>
                <div>
                    <label htmlFor="zipCode">CEP</label>
                    <input type="text" id="zipCode" {...register("address.zipCode")}/>
                    {errors.address?.zipCode && <p>{errors.address?.zipCode.message}</p>}
                </div>
                <div className="flex-horizontal">
                    <div>
                        <label htmlFor="state">Estado</label>
                        <input type="text" id="state" {...register("address.state")}/>
                        {errors.address?.state && <p>{errors.address?.state.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="city">Cidade</label>
                        <input type="text" id="city" {...register("address.city")}/>
                        {errors.address?.city && <p>{errors.address?.city.message}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="street">Rua</label>
                    <input type="text" id="street" {...register("address.street")}/>
                    {errors.address?.street && <p>{errors.address?.street.message}</p>}
                </div>
                <div className="flex-horizontal">
                    <div>
                        <label htmlFor="number">Número</label>
                        <input type="number" id="number" {...register("address.number")}/>
                        {errors.address?.number && <p>{errors.address?.number.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="complement">Complemento</label>
                        <input type="text" id="complement" {...register("address.complement")}/>
                        {errors.address?.complement && <p>{errors.address?.complement.message}</p>}
                    </div>
                </div>
                <h1>Tipo de conta</h1>
                <div className="flex-horizontal">
                    <Button onClick={() => setValue("isAdvertiser", false)}>
                        Comprador      
                    </Button>
                    <Button onClick={() => setValue("isAdvertiser", true)}>
                        Anunciante
                    </Button>
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" {...register("password")}/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input type="password" id="confirmPassword" {...register("confirmPassword")}/>
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
                <Button type={"submit"}>
                    Finalizar cadastro
                </Button>
            </form>
        </div>
    )
}

export default RegisterForm