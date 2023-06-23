'use client'
import api from "@/services"
import Modal from "./modal"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordReq } from "@/schemas/users.schema"
import { useForm } from "react-hook-form"

import "../../styles/components/modals/resetPasswordModal.sass"
import Button from "../button/button"

import { TResetPasswordReq } from "@/schemas/users.schema"
import axios from "axios"

import { Input } from "../inputs/inputs"

const ResetPasswordModal = () => {
    const [sentEmail, setSentEmail] = useState<boolean>(false)
    const [existantUser, setExistantUser] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(resetPasswordReq)
    })

    const sendEmail = async(data: TResetPasswordReq) => {
        setLoading(true)
        setExistantUser(true)
        setSentEmail(false)
        try{
            const request = await api.post("/users/resetPassword",data)

            if(request.status === 200){
                setSentEmail(true)
            }
            return request
        }catch(err: unknown){
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if(err.response.status === 404){
                        setExistantUser(false)
                    }
                }
              }
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const sendEmailSubmit = (data: any) => {
        console.log(data)
        sendEmail(data)
    }

    console.log(errors)
    
    return(
        <Modal title="Redefinir Senha">
            <div className="reset-password">
                <h4>Insira seu email cadastrado</h4>
                <p>Enviaremos uma mensagem para redefinir sua senha para o seu e-mail cadastrado</p>
                <form onSubmit={handleSubmit(sendEmailSubmit)}>
                    <Input id="email" rest={register("email")}>Email</Input>
                    {
                        loading && 
                        <div className="sending-email">
                            <img className="loading" src="https://cdn.onlinewebfonts.com/svg/img_376341.png"/>
                            <span className="loading-msg">Enviando email de recuperação</span>
                        </div>
                    }
                    {
                        errors.email?.message &&
                            <span className="error">{(errors.email.message).toString()}</span>
                        
                    }
                    {
                        !existantUser &&
                        <span className="error">Usuário não encontrado</span>
                    }
                    {
                        sentEmail &&
                        <span className="success">Email enviado</span>
                    }
                    <Button width={50}>Enviar</Button>
                </form>
            </div>
        </Modal>
    )
}

export default ResetPasswordModal