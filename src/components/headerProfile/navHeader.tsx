'use client'

import { useState } from "react";
import { Elipsis } from "../tags/tags";
import Button from "../button/button";
import { useAuthContext } from "@/context/authContext";

const NavHeader=({name}:{name:string})=>{

    const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
    const{logout}=useAuthContext()

    return (
        <>
            <nav className={dropdownMenu ? "" : "hidden-dropdown-menu"}>
                <Elipsis name={name}/>
                <Button onClick={logout}>Sair</Button>
            </nav>

            <Button onClick={() => setDropdownMenu(!dropdownMenu)} className={dropdownMenu ? "active-dropdown": ""}>
                <span></span>
                <span></span>
                <span></span>
            </Button> 
        </>
    )
}

export default NavHeader