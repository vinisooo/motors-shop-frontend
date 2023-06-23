'use client'
import api from "@/services"
import Modal from "./modal"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordReq } from "@/schemas/users.schema"
import { useForm } from "react-hook-form"

const ResetPasswordModal = () => {
    const [sentEmail, setSentEmail] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(resetPasswordReq)
    })

    const sendEmail = async() => {
        const request = await api.post("/resetPassword",)
    }

    return(
        <Modal title="Redefinir Senha">
            <h4>Insira seu email cadastrado</h4>
            <p>Enviaremos uma mensagem para redefinir sua senha em seu e-mail cadastrado</p>
            <form>
                <input type="email" max={60}/>
                <button type="submit">Enviar</button>
            </form>
        </Modal>
    )
}

export default ResetPasswordModal