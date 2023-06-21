'use client'
import "../../styles/pages/home/filterList.sass"
import Link from "next/link"

import { useState } from "react"
import { useContext } from "react"
import { ModalContext } from "@/context/modalContext"
import { filterData } from "./filterData"

import Button from "../button/button"

import { AiOutlineClose } from 'react-icons/ai'

import { Dispatch, SetStateAction, EventHandler } from "react"
import { useSearchParams, useRouter } from "next/navigation"


export interface iFilters {
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    year: string | undefined,
    fuel: string | undefined,
    page: string | undefined,
    minKm: string | undefined,
    maxKm: string | undefined,
    minPrice: string | undefined,
    maxPrice: string | undefined,
    [key: string]: string | undefined;
}

export interface iFilterListProps {
    searchParams: iFilters
}

const FilterList = ({searchParams}: iFilterListProps) => {
    const {filterDropdown, setFilterDropdown} = useContext(ModalContext)
    const router = useRouter()

    const [minKm, setMinKm] = useState<string>(searchParams.minKm ? searchParams.minKm : "");
    const [maxKm, setMaxKm] = useState<string>(searchParams.maxKm ? searchParams.maxKm : "");
    const [minPrice, setMinPrice] = useState<string>(searchParams.minPrice ? searchParams.minPrice : "");
    const [maxPrice, setMaxPrice] = useState<string>(searchParams.maxPrice ? searchParams.maxPrice : "");


    const handleFilter = (filterCategory: string, filter: string) => {
        if(searchParams[filterCategory] === filter){
            let newParams = {...searchParams}
            delete newParams[filterCategory]
            return {
                query: newParams
            }
        }
        delete searchParams.page
        return {
            query: {
                ...searchParams,
                [filterCategory]: filter,
            }
        }
    }

    const handleFilterInput = (stateName: string, state: string, setState:Dispatch<SetStateAction<string>>) => {
        setState(state)
        let params: URLSearchParams | string = new URLSearchParams()

        if(Object.keys(searchParams).includes(stateName)){
            delete searchParams[stateName]
        }
        
        for (const key in searchParams) {
            if (searchParams.hasOwnProperty(key) && searchParams[key] !== undefined) {
                params.append(key, searchParams[key]!)
            }
        }
        if(state === ""){
            router.push(`?${params}`)
            return
        }
        if(params.toString().length > 0){
            router.push(`?${params}&${stateName}=${state}`)
        }else{
            router.push(`?${stateName}=${state}`)
        }
    }

    const clearFilter = () => {
        setMinKm("")
        setMaxKm("")
        setMinPrice("")
        setMaxPrice("")
        router.push("")
    }

    let filterWithoutPage = {...searchParams}
    delete filterWithoutPage["page"];

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
                <input value={minKm} min={0} onChange={(e) => handleFilterInput("minKm", e.target.value, setMinKm)} type="number" placeholder="mínimo" className="filter-input"></input>
                <input value={maxKm} min={0} onChange={(e) => handleFilterInput("maxKm", e.target.value, setMaxKm)} type="number" placeholder="máximo" className="filter-input"></input>
            </div>
            <div>
                <h4>Preço</h4>
                <input value={minPrice} min={0} onChange={(e) => handleFilterInput("minPrice", e.target.value, setMinPrice)} type="number" placeholder="mínimo" className="filter-input"></input>
                <input value={maxPrice} min={0} onChange={(e) => handleFilterInput("maxPrice", e.target.value, setMaxPrice)} type="number" placeholder="máximo" className="filter-input"></input>
            </div>
            <button onClick={clearFilter} className={`clear-filter ${Object.keys(filterWithoutPage).length === 0 && "hidden-clear-filter"}`}>Limpar Filtros</button>
        </aside>
    )
}

export default FilterList