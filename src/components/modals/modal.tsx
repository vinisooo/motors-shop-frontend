"use client"

import { useModalContext } from "@/context/modalContext"
import { useEffect, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"

import "../../styles/components/modals/modal.sass"
import Button from "../button/button"

interface IModalProps{
    children?: React.ReactNode
    title?: string
    className?: string
}


const Modal = ({children, title, className}: IModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)

    const { setResetPasswordModal, setCreateAdvertModal,
        setCarImageModal, setEditProfileModal, setDeleteProfileModal,
        setEditAddressModal, setDeleteAdvertModal, setEditAdvertModal } = useModalContext()

    const closeModal = () => {
        setResetPasswordModal(false)
        setCreateAdvertModal(false)
        setCarImageModal(false)
        setEditProfileModal(false)
        setDeleteProfileModal(false)
        setEditAddressModal(false)
        setDeleteAdvertModal(false)
        setEditAdvertModal(false)
    }
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const isButton = target.tagName.toLowerCase() === "button"
            if (modalRef.current && !modalRef.current.contains(event.target as Node) && !isButton) {
                closeModal()
            } 
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return(
        <div className="modal-bg">
            <div ref={modalRef} className={`modal ${className}`}>
                <header>
                    <h2>{title}</h2>
                    <Button onClick={closeModal}>
                        <AiOutlineClose/>
                    </Button>
                </header>
                {children}
            </div>
        </div>
    )
}

export default Modal