"use client"
import "../../styles/components/modals/editProfileModal.sass"
import { Input, TextArea } from "../inputs/inputs"
import Modal from "./modal"
import Button from "../button/button"
import { useContext, useState } from "react"
import { ModalContext } from "@/context/modalContext"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { usersUpdateReqSchema } from "@/schemas/users.schema"
import { useAuthContext } from "@/context/authContext"

const EditProfileModal = () => {    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<any>({
        resolver: zodResolver(usersUpdateReqSchema)
    })

    const {user} = useAuthContext()

    const [name, setName] = useState<string>(user.name)
    const [email, setEmail] = useState<string>(user.email)
    const [phone, setPhone] = useState<string>(user.phone)
    const [birthdate, setBirthdate] = useState<string>(user.birthdate)
    const [description, setDescription] = useState<string>(user.description)

    const {setDeleteProfileModal, setEditProfileModal} = useContext(ModalContext)

    const submitUpdate: SubmitHandler<any> = (data) => {
        // data = {name, email, phone, birthdate, description}
        console.log(data)
    }

    const deleteProfileCallBack = () => {
        setEditProfileModal(false)
        setDeleteProfileModal(true)
    }
    return(
        <Modal title="Editar Perfil">
            <h2>Informações Pessoais</h2>
            <form onSubmit={handleSubmit(submitUpdate)} className="edit-profile-form">
                <Input value={name} register={register("name")} onChange={(e)=>setName(e.target.value)}>
                    Nome
                </Input>
                <Input value={email} register={register("email")} type="email" onChange={(e)=>setEmail(e.target.value)}>
                    Email
                </Input>
                <Input value={phone} register={register("phone")} onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.slice(0, 11)} {...register("phone")} type="number" onChange={(e)=>setPhone(e.target.value)}>
                    Celular
                </Input>
                <Input value={birthdate}  register={register("birthdate")} type="date" onChange={(e)=>setBirthdate(e.target.value)}>
                    Data de nascimento
                </Input>
                <TextArea value={description} register={register("description")} onChange={(e)=>setDescription(e.target.value)}>Descrição</TextArea>
                <div className="form-buttons">
                    <Button Style="negative-1" type="button" onClick={()=> setEditProfileModal(false)} width={50}>Cancelar</Button>
                    <Button Style="alert" type="button" onClick={deleteProfileCallBack} width={50}>Excluir Perfil</Button>
                </div>
                <Button type="submit" width={100}>Salvar Alterações</Button>
            </form>
        </Modal>
    )
}

export default EditProfileModal