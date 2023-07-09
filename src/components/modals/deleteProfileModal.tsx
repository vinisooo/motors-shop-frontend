"use client"

import Button from "../button/button"
import Modal from "./modal"
import { useModalContext } from "@/context/modalContext"
import "../../styles/components/modals/deleteModal.sass"
import { useUserContext } from "@/context/userContext"


const DeleteProfileModal = () =>{ 
    const { setDeleteProfileModal, setEditProfileModal } = useModalContext()
    const {deleteUser} = useUserContext()

    const closeModal = () => {
        setDeleteProfileModal(false)
        setEditProfileModal(true)
    }

    const deleteUserCallBack = () => {
        deleteUser()
        setDeleteProfileModal(false)
    }

    return(
        <Modal title="Excluir Perfil">
            <div className="advice">
                <h3>Tem certeza que deseja deletar sua conta?</h3>
                <p>Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores.</p>
            </div>
            <div className="delete-modal-buttons">
                <Button type="button" onClick={closeModal} Style="negative-1">Cancelar</Button>
                <Button type="button" onClick={deleteUserCallBack} Style="alert">Sim, excluir conta</Button>
            </div>
        </Modal>
    )
} 

export default DeleteProfileModal