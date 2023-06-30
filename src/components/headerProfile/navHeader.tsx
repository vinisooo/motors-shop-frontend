'use client'

import { useState } from "react";
import { Elipsis } from "../tags/tags";
import Button from "../button/button";
import { useAuthContext } from "@/context/authContext";
import { redirect } from "next/navigation";

const NavHeader=({name}:{name:string})=>{

    const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
    const{logout}=useAuthContext()

    return (
        <>
            <nav className={dropdownMenu ? "" : "hidden-dropdown-menu"}>
                <div onClick={()=>{redirect('/user')}}>
                    <Elipsis name={name}/>
                </div>
                <Button onClick={logout}>Sair</Button>
            </nav>

            <button onClick={() => setDropdownMenu(!dropdownMenu)} className={dropdownMenu ? "dropdown-btn active-dropdown": "dropdown-btn"}>
                <span></span>
                <span></span>
                <span></span>
            </button> 
        </>
    )
}

export default NavHeader