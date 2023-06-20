'use client'
import "../../styles/pages/home/filterList.sass"
import Link from "next/link"

import { useContext } from "react"
import { ModalContext } from "@/context/modalContext"
import { filterData } from "./filterData"

import { AiOutlineClose } from 'react-icons/ai';

export interface iFilters {
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    year: string | undefined,
    fuel: string | undefined,
    page: string | undefined,
    [key: string]: string | undefined;
}

export interface iFilterListProps {
    searchParams: iFilters
}

const FilterList = ({searchParams}: iFilterListProps) => {
    const {filterDropdown, setFilterDropdown} = useContext(ModalContext)

    const handleFilter = (filterCategory: string, filter: string) => {
        if(searchParams[filterCategory] === filter){
            let newParams = {...searchParams}
            delete newParams[filterCategory]
            return {
                query: newParams
            }
        }
        return {
            query: {
                ...searchParams,
                [filterCategory]: filter
            }
        }
    }
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
                filterData.map((filterCategory, index) => {
                    return(
                        <div key={index}>
                            <h4>{filterCategory.title}</h4>
                            <ul className="filter-list">
                                {
                                    filterCategory.filters.map((filter, index) => {
                                        return(
                                            <li key={index}>
                                                <Link
                                                    className={
                                                        searchParams[filterCategory.name] === filter ? "selected" : ""
                                                    }
                                                    href={handleFilter(filterCategory.name, filter)}
                                                >
                                                    {filter}
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