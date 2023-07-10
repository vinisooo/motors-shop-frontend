"use client"

import { useModalContext } from "@/context/modalContext"
import { useEffect, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"

import "../../styles/components/modals/modal.sass"
import Button from "../button/button"
import { MdClose } from "react-icons/md"

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
          if (modalRef.current && !modalRef.current.contains(target)) {
            if (target.classList.contains("modal-bg")) {
              closeModal()
            }
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
                        <MdClose/>
                    </Button>
                </header>
                {children}
            </div>
        </div>
    )
}

export default Modal