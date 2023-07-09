"use client"

import { useState, useEffect, useRef } from "react"
import { Elipsis } from "../tags/tags"
import Button from "../button/button"
import { useUserContext } from "@/context/userContext"
import { redirect } from "next/navigation"
import Link from "next/link"
import { useModalContext } from "@/context/modalContext"
import EditProfileModal from "../modals/editProfileModal"
import DeleteProfileModal from "../modals/deleteProfileModal"
import EditAddressModal from "../modals/editAddressModal"
import { AiOutlineLoading } from "react-icons/ai"
import "../../styles/components/header/header.sass"
import getRandomColor from "@/utils/randomElipsisColor"


const NavHeader = () => {
    const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const { logout, user } = useUserContext();
    const {
        setEditProfileModal,
        editProfileModal,
        deleteProfileModal,
        setEditAddressModal,
        editAddressModal
    } = useModalContext();

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setDropdownMenu(false);
        }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
        document.removeEventListener("click", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <>
        <nav ref={dropdownRef} className={dropdownMenu ? "" : "hidden-dropdown-menu"}>
            <div onClick={() => { redirect('/user') }}>
            {
                Object.keys(user).length === 0 ?
                <Elipsis color={getRandomColor()} loading={true} name={"Carregando"} />
                :
                <Elipsis color="purple-1" name={user.name} />
            }
            </div>
            <nav className="user-dropdown">
            {
                Object.keys(user).length === 0 ?
                <AiOutlineLoading className="loading-icon" />
                :
                <>
                    <Button type="button" onClick={() => setEditProfileModal(true)}>Editar Perfil</Button>
                    <Button type="button" onClick={() => setEditAddressModal(true)}>Editar Endereço</Button>
                    {
                    user.isAdvertiser &&
                    <Link href={"/user"}>Meus Anúncios</Link>
                    }
                    <Button type="button" onClick={logout}>Sair</Button>
                </>
            }
            </nav>
        </nav>
        <button
            onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
            setDropdownMenu(!dropdownMenu);
            }}
            className={dropdownMenu ? "dropdown-btn active-dropdown" : "dropdown-btn"}
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
        {
            editProfileModal &&
            <EditProfileModal />
        }
        {
            deleteProfileModal &&
            <DeleteProfileModal />
        }
        {
            editAddressModal &&
            <EditAddressModal />
        }
        </>
    )
}

export default NavHeader
