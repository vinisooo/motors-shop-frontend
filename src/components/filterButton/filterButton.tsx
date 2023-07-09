"use client"

import Button from "../button/button"

import {  useModalContext } from "@/context/modalContext"

const FilterButton = () => { 
    const { filterDropdown,setFilterDropdown} = useModalContext()

    return(
        <Button onClick={() => setFilterDropdown(true)} width={80} size="medium">Filtros</Button>
    )
}

export default FilterButton
