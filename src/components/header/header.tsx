"use client"
import "../../styles/components/header/header.sass"
import Link from "next/link"
import Logo from "../logo/logo"
import { useState } from "react"

const Header = () => {
    const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);

    return(
        <header className="main-header">
            <Link href="/">
                <Logo/>
            </Link>

            <nav className={dropdownMenu ? "" : "hidden-dropdown-menu"}>
                <Link href="/login">Fazer Login</Link>
                <Link href="/register">Cadastrar</Link>
            </nav>

            <button onClick={() => setDropdownMenu(!dropdownMenu)} className={dropdownMenu ? "dropdown-btn active-dropdown": "dropdown-btn"}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    )
}

export default Header