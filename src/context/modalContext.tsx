'use client'
import { createContext, useContext } from "react";
import { useState } from "react";

import { iChildrenProps, iModalContextValues } from "./interfaces";

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