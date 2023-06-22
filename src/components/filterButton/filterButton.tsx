'use client'
import Button from "../button/button"

import { useContext } from "react"
import { ModalContext } from "@/context/modalContext"

const FilterButton = () => { 
    const { filterDropdown,setFilterDropdown} = useContext(ModalContext)

    return(
        <Button onClick={() => setFilterDropdown(true)} width={80} size="medium">Filtros</Button>
    )
}

export default FilterButton
