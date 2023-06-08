"use client"
import "../../styles/components/header/header.sass"
import Link from "next/link"
import Logo from "../logo/logo"
import { useState } from "react"

const Header = () => {
    const [active, setActive] = useState<boolean>(false);

    return(
        <header>
            <Link href="/">
                <Logo/>
            </Link>

            <nav>
                <Link href="/login">Fazer Login</Link>
                <Link href="/register">Cadastrar</Link>
            </nav>

            <button onClick={() => setActive(!active)} className={active ? "active-dropdown": ""}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    )
}

export default Header