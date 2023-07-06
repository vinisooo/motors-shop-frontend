'use client'
import "../../styles/pages/home/filterList.sass"
import Link from "next/link"

import { useEffect, useState } from "react"
import { useContext } from "react"
import { ModalContext } from "@/context/modalContext"
import { filterData } from "./filterData"

import { AiOutlineClose } from 'react-icons/ai'

import { Dispatch, SetStateAction, EventHandler } from "react"
import { useRouter } from "next/navigation"
import { TAdvertisementRes } from "@/schemas/advertisement.schema"


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


const FilterList = ({searchParams, advertisements}: {searchParams: iFilters, advertisements: TAdvertisementRes[]}) => {
    const {filterDropdown, setFilterDropdown} = useContext(ModalContext)
    const router = useRouter()

    const [minKm, setMinKm] = useState<string>(searchParams.minKm ? searchParams.minKm : "");
    const [maxKm, setMaxKm] = useState<string>(searchParams.maxKm ? searchParams.maxKm : "");
    const [minPrice, setMinPrice] = useState<string>(searchParams.minPrice ? searchParams.minPrice : "");
    const [maxPrice, setMaxPrice] = useState<string>(searchParams.maxPrice ? searchParams.maxPrice : "");

    const extractFilterData = (data: TAdvertisementRes[]) =>{
        const brandList: string[] = [];
        const modelList: string[] = [];
        const colorList: string[] = [];
        const yearList: number[] = [];
        const fuelList: string[] = [];
      
        for (let item of data) {
            if (!brandList.includes(item.brand)) {
                brandList.push(item.brand);
            }
            if (!modelList.includes(item.model)) {
            modelList.push(item.model);
            }
            if (!colorList.includes(item.color)) {
            colorList.push(item.color);
            }
            if (!yearList.includes(item.year)) {
            yearList.push(item.year);
            }
            if (!fuelList.includes(item.fuel)) {
            fuelList.push(item.fuel);
            }
        }
        return {
            brand: brandList, model: modelList, color: colorList, year: yearList, fuel: fuelList,
        }
    }
    
    const extractedFilter = extractFilterData(advertisements)

    const handleFilter = (filterCategory: string, filter: string) => {
        if(searchParams[filterCategory] === filter){
            let newParams = {...searchParams}
            delete newParams[filterCategory]
            return {
                hash: "filter-applied",
                query: newParams,
            }
        }
        delete searchParams.page
        return {
            hash: "filter-applied",
            query: {
                ...searchParams,
                [filterCategory]: filter,
            }
        }
    }

    const handleFilterInput = (stateName: string, state: string, setState:Dispatch<SetStateAction<string>>) => {
        setState(state)
        setTimeout(() => {
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
                router.push(`?${params}#filter-applied`)
                return
            }
            if(params.toString().length > 0){
                router.push(`?${params}&${stateName}=${state}#filter-applied`)
            }else{
                router.push(`?${stateName}=${state}#filter-applied`)
            }
        },2500)
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
            <div>
                <div>
                    <h4>Km</h4>
                    <input value={minKm} min={0} onChange={(e) => handleFilterInput("minKm", e.target.value, setMinKm)}
                        type="number" placeholder="mínimo" className="filter-input">
                    </input>
                    <input value={maxKm} min={0} onChange={(e) => handleFilterInput("maxKm", e.target.value, setMaxKm)}
                        type="number" placeholder="máximo" className="filter-input">
                    </input>
                </div>
                <div>
                    <h4>Preço</h4>
                    <input value={minPrice} min={0} onChange={(e) => handleFilterInput("minPrice", e.target.value, setMinPrice)}
                        type="number" placeholder="mínimo" className="filter-input">
                    </input>
                    <input value={maxPrice} min={0} onChange={(e) => handleFilterInput("maxPrice", e.target.value, setMaxPrice)}
                        type="number" placeholder="máximo" className="filter-input">
                    </input>
                </div>
                <h4>Marca</h4>
                <ul className="filter-list">
                    {
                        extractedFilter.brand.map((filter, index) => {
                            if(filter){
                                return(
                                    <li key={index}>
                                        <Link
                                            scroll={false}
                                            className={
                                                searchParams.brand === filter ? "selected" : ""
                                            }
                                            href={handleFilter("brand", filter)}
                                            replace 
                                        >
                                            {filter[0].toUpperCase() + filter.substring(1)}
                                        </Link>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
            <div>
                <h4>Modelo</h4>
                <ul className="filter-list">
                    {
                        extractedFilter.model.map((filter, index) => {
                            if(filter){
                                return(
                                    <li key={index}>
                                        <Link
                                            scroll={false}
                                            className={
                                                searchParams.model === filter ? "selected" : ""
                                            }
                                            href={handleFilter("model", filter)}
                                            replace 
                                        >
                                            {`${filter[0].toUpperCase() + filter.split(" ")[0].substring(1)}
                                            ${filter.split(" ")[1] ? filter.split(" ")[1] : ""}
                                            ${filter.split(" ")[2] ? filter.split(" ")[2] : ""}`}
                                        </Link>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
            <div>
                <h4>Cor</h4>
                <ul className="filter-list">
                    {
                        extractedFilter.color.map((filter, index) => {
                            if(filter){
                                return(
                                    <li key={index}>
                                        <Link
                                            scroll={false}
                                            className={
                                                searchParams.color === filter ? "selected" : ""
                                            }
                                            href={handleFilter("color", filter)}
                                            replace 
                                        >
                                            {filter[0].toUpperCase() + filter.substring(1)}
                                        </Link>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
            <div>
                <h4>Ano</h4>
                <ul className="filter-list">
                    {
                        extractedFilter.year.map((filter, index) => {
                            if(filter){                                
                                return(
                                    <li key={index}>
                                        <Link
                                            scroll={false}
                                            className={
                                                Number(searchParams.year) == filter ? "selected" : ""
                                            }
                                            href={handleFilter("year", filter.toString())}
                                            replace 
                                        >
                                            {filter}
                                        </Link>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
            <div>
                <h4>Combustível</h4>
                <ul className="filter-list">
                    {
                        extractedFilter.fuel.map((filter, index) => {
                            if(filter){
                                return(
                                    <li key={index}>
                                        <Link
                                            scroll={false}
                                            className={
                                                searchParams.fuel === filter ? "selected" : ""
                                            }
                                            href={handleFilter("fuel", filter)}
                                            replace
                                        >
                                            {filter[0].toUpperCase() + filter.substring(1)}
                                        </Link>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
            <button onClick={clearFilter} className={`clear-filter ${Object.keys(filterWithoutPage).length === 0 && "hidden-clear-filter"}`}>
                Limpar Filtros
            </button>
        </aside>
    )
}

export default FilterList