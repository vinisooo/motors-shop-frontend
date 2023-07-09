"use client"
import Button from "@/components/button/button"
import "../../../styles/components/modals/deleteModal.sass"

import { useCarsContext } from "@/context/carsContext"
import { useModalContext } from "@/context/modalContext"


const DeleteAdvert= async({id}:{id:string})=>{

    const {deleteAdvert} = useCarsContext()
    const { deleteAdvertModal,setDeleteAdvertModal, setEditAdvertModal} = useModalContext()

    const closeModal = () =>{
        setDeleteAdvertModal(false)
        setEditAdvertModal(true)
    }


    if(!deleteAdvert){
        return <></>
    }
    return(
        <div className="div-delete">
            <div className="advice">
                <h3>Tem certeza que deseja deletar este anuncio?</h3>
                <p>Essa ação não pode ser desfeita. Isso excluirá o anúncio permanentemente e removerá seus dados de nossos servidores.</p>
            </div>
            <div className="delete-modal-buttons">
                <Button type={"button"} Style={"confirm"} onClick={()=>deleteAdvert(id)}>Sim</Button>
                <Button type={"button"} Style={"cancel"} onClick={closeModal}>Não</Button>
            </div>
        </div>

    )
}

export {DeleteAdvert}