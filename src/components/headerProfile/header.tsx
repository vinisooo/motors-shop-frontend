'use client'
import "../../styles/components/header/header.sass"
import Link from "next/link"
import Logo from "../logo/logo"
import { useState } from "react"
import { Elipsis } from "../tags/tags"


const HeaderProfile = ({name}:{
    name:string,
}) => {
    const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);

    return(
        <div className="main-header">
            <Link href="/">
                <Logo/>
            </Link>

            <nav className={dropdownMenu ? "" : "hidden-dropdown-menu"}>
                <Elipsis name={name}/>
            </nav>

            <button onClick={() => setDropdownMenu(!dropdownMenu)} className={dropdownMenu ? "active-dropdown": ""}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    )
}

export default HeaderProfile