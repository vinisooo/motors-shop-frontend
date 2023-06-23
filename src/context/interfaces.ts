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

export type {iChildrenProps, iModalContextValues}