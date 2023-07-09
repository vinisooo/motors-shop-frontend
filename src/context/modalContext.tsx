"use client"

import { createContext, useContext } from "react"
import { useState } from "react"

import { SetStateAction } from "react"

interface IChildrenProps{
    children: React.ReactNode
}

interface IModalContextValues{
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
    editAddressModal: boolean
    setEditAddressModal: React.Dispatch<SetStateAction<boolean>>
}


export const ModalContext = createContext({} as IModalContextValues)

export const ModalProvider = ({children}: IChildrenProps) => {
    const [filterDropdown, setFilterDropdown] = useState<boolean>(false)
    const [resetPasswordModal, setResetPasswordModal] = useState<boolean>(false)
    const [createAdvertModal, setCreateAdvertModal] = useState<boolean>(false)
    const [carImageModal, setCarImageModal] = useState<boolean>(false)
    const [carImage, setCarImage] = useState<string>("")
    const [editProfileModal, setEditProfileModal] = useState<boolean>(false)
    const [deleteProfileModal, setDeleteProfileModal] = useState<boolean>(false)
    const [editAddressModal, setEditAddressModal] = useState<boolean>(false)

    return(
        <ModalContext.Provider value={{filterDropdown, setFilterDropdown, resetPasswordModal, 
            setResetPasswordModal, createAdvertModal, setCreateAdvertModal, carImageModal, setCarImageModal, 
            carImage, setCarImage, editProfileModal, setEditProfileModal, deleteProfileModal, setDeleteProfileModal,
            editAddressModal, setEditAddressModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => useContext(ModalContext)