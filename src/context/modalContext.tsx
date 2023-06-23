"use client"
import { createContext, useContext } from "react"
import { useState } from "react"

import { SetStateAction } from "react"

interface iChildrenProps{
    children: React.ReactNode
}

interface iModalContextValues{
    filterDropdown: boolean
    setFilterDropdown: React.Dispatch<SetStateAction<boolean>>
    resetPasswordModal: boolean
    setResetPasswordModal: React.Dispatch<SetStateAction<boolean>>
}


export const ModalContext = createContext({} as iModalContextValues)

const ModalProvider = ({children}: iChildrenProps) => {
    const [filterDropdown, setFilterDropdown] = useState<boolean>(false)
    const [resetPasswordModal, setResetPasswordModal] = useState<boolean>(false)
    
    return(
        <ModalContext.Provider value={{filterDropdown, setFilterDropdown, resetPasswordModal, setResetPasswordModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider