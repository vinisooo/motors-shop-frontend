"use client"

import { useCarsContext } from "@/context/carsContext"
import { DeleteAdvert } from "../forms/adverts/deleteAdvertForm"
import Modal from "./modal"
import { useModalContext } from "@/context/modalContext"

const DeleteAdvertModal = () => {
    const { currentAdvert } =  useCarsContext()
    const { deleteAdvertModal } = useModalContext()

    if(!deleteAdvertModal){
        return <></>
    }
    return(
        <Modal title="Excluir anúncio">
            {
                currentAdvert &&
                <DeleteAdvert id={currentAdvert.id}/>
            }
        </Modal>
    )
}

export default DeleteAdvertModal