'use client'
import { ModalContext } from "@/context/modalContext";
import { useContext, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai"

import "../../styles/components/modals/modal.sass"

interface iModalProps{
    children?: React.ReactNode;
    title?: string;
}

const Modal = ({children, title}: iModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const { setResetPasswordModal } = useContext(ModalContext)

    const closeModal = () => {
        setResetPasswordModal(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal()
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return(
        <div className="modal-bg">
            <div ref={modalRef} className="modal">
                <header>
                    <h2>{title}</h2>
                    <button onClick={closeModal}>
                        <AiOutlineClose/>
                    </button>
                </header>
                {children}
            </div>
        </div>
    )
}

export default Modal