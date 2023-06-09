'use client'
import "../../styles/pages/home/filterList.sass"
import Link from "next/link"

import { useContext } from "react"
import { ModalContext } from "@/context/modalContext"

import { AiOutlineClose } from 'react-icons/ai';

const FilterList = () => {
    const {filterDropdown, setFilterDropdown} = useContext(ModalContext)

    console.log(filterDropdown);

    return(
        <aside className={`aside-filter ${filterDropdown ? "" : "hidden-aside-filter"}`}>
            <header className="filter-header">
                <h3>
                    Filtro
                </h3>
                <button onClick={() => setFilterDropdown(false)}>
                    <AiOutlineClose/>
                </button>
            </header>
            <div>
                <h4>Marca</h4>
                <ul className="filter-list">
                    <li>
                        <Link href="">
                            pipipi
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            pipipi
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h4>Cor</h4>
                <ul className="filter-list">
                    <li>
                        <Link href="">
                            amalero
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            ralanjado
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h4>Km</h4>
                <input placeholder="mínimo" className="filter-input"></input>
                <input placeholder="máximo" className="filter-input"></input>
            </div>
            <div>
                <h4>preço</h4>
                <input placeholder="mínimo" className="filter-input"></input>
                <input placeholder="máximo" className="filter-input"></input>
            </div>
        </aside>
    )
}

export default FilterList