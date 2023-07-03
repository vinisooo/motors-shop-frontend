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
    createAdvertModal: boolean
    setCreateAdvertModal: React.Dispatch<SetStateAction<boolean>>
    carImageModal: boolean
    setCarImageModal: React.Dispatch<SetStateAction<boolean>>
    carImage: string
    setCarImage: React.Dispatch<SetStateAction<string>>
    editProfileModal: boolean
    setEditProfileModal: React.Dispatch<SetStateAction<boolean>>
    deleteProfileModal: boolean
    setDeleteProfileModal: React.Dispatch<SetStateAction<boolean>>
}


export const ModalContext = createContext({} as iModalContextValues)

const ModalProvider = ({children}: iChildrenProps) => {
    const [filterDropdown, setFilterDropdown] = useState<boolean>(false)
    const [resetPasswordModal, setResetPasswordModal] = useState<boolean>(false)
    const [createAdvertModal, setCreateAdvertModal] = useState<boolean>(false)
    const [carImageModal, setCarImageModal] = useState<boolean>(false)
    const [carImage, setCarImage] = useState<string>("")
    const [editProfileModal, setEditProfileModal] = useState<boolean>(false)
    const [deleteProfileModal, setDeleteProfileModal] = useState<boolean>(false)

    return(
        <ModalContext.Provider value={{filterDropdown, setFilterDropdown, resetPasswordModal, 
            setResetPasswordModal, createAdvertModal, setCreateAdvertModal, carImageModal, setCarImageModal, 
            carImage, setCarImage, editProfileModal, setEditProfileModal, deleteProfileModal, setDeleteProfileModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider