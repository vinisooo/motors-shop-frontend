import Button from '@/components/button/button'
import '../modalBase/modalStyle.sass'
import { ReactNode, useEffect, useRef, useState } from "react"
import { AiOutlineClose } from 'react-icons/ai'

interface IModal{
    children: ReactNode,
    title?:string,
    modalContent: ReactNode
}

export const Modal=({children,modalContent,title}:IModal)=>{

    const modalRef=useRef<HTMLDivElement>(null)
    const [modalOpen,setModalOpen]=useState(false)


    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            event.target==modalRef.current &&
            setModalOpen(false)
        }

        window.addEventListener("mousedown",handleClickOutside)
     
        return ()=>{
            window.removeEventListener("mousedown", handleClickOutside)
        }

    },[])

    return modalOpen ?
    (
        <>
            {children}
            <div ref={modalRef} className="backdrop">
                <div className="modal">
                    <div className="modal-header">
                        <h2>{title}</h2>
                        <Button onClick={()=>setModalOpen(false)}><AiOutlineClose/></Button>
                    </div>
                    <div className="modal-body">
                        {modalContent}
                    </div>
                </div>
            </div>
        </>
    )
    :
    <div className="fake-modal" onClick={()=>setModalOpen(true)}>
        {children}
    </div>

}