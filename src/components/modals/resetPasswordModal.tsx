'use client'
import api from "@/services"
import Modal from "./modal"
import { useContext, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordEmailReqSchema } from "@/schemas/users.schema"
import { SubmitHandler, useForm } from "react-hook-form"

import "../../styles/components/modals/resetPasswordModal.sass"
import Button from "../button/button"

import { TResetPasswordReq } from "@/schemas/users.schema"
import axios from "axios"

import { Input } from "../inputs/inputs"
import { useAuthContext } from "@/context/authContext"

const ResetPasswordModal = () => {

    const {
        sentEmail, setSentEmail,
        existantUser, setExistantUser,
        loading, setLoading, sendResetPasswordEmail
    }= useAuthContext()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(resetPasswordEmailReqSchema)
    })

    const sendEmailSubmit: SubmitHandler<any> = (data) => {
        sendResetPasswordEmail(data)
    }


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