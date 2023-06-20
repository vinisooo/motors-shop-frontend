'use client'
import "../../styles/pages/home/filterList.sass"
import Link from "next/link"

import { useContext } from "react"
import { ModalContext } from "@/context/modalContext"
import { filterData } from "./filterData"

import { AiOutlineClose } from 'react-icons/ai';

export interface iFilterListProps {
    searchParams: {
        brand: string | undefined,
        model: string | undefined,
        color: string | undefined,
        year: string | undefined,
        fuel: string | undefined,
    }
}

const FilterList = ({searchParams}: any) => {
    const {filterDropdown, setFilterDropdown} = useContext(ModalContext)

    console.log(searchParams);

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
            {
                filterData.map((filter, index) => {
                    return(
                        <div key={index}>
                            <h4>{filter.title}</h4>
                            <ul className="filter-list">
                                {
                                    filter.filters.map((filters, index) => {
                                        return(
                                            <li key={index}>
                                                <Link
                                                    replace={true}
                                                    href={{
                                                        query: {
                                                            ...searchParams,
                                                            [filter.name.toLowerCase()]: filters.toLowerCase()
                                                        }
                                                    }}
                                                >
                                                    {filters}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
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