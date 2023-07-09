"use client"

import { useCarsContext } from "@/context/carsContext"
import { EditAdvertForm } from "../forms/adverts/editAdvertForm"
import Modal from "./modal"
import { useModalContext } from "@/context/modalContext"


const EditAdvertModal = () => {
    const { currentAdvert } = useCarsContext()
    const {editAdvertModal} = useModalContext()

    if(!editAdvertModal){
        return <></>
    }
    return(
        <Modal title="Editar anúncio">
            {
                currentAdvert &&
                <EditAdvertForm car={currentAdvert}/>
            }
        </Modal>
    )
}

export default EditAdvertModal