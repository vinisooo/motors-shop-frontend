'use client'
import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import HomeHeader from "@/components/homeHeader/HomeHeader"
import "../styles/pages/home/home.sass"
import FilterList from "@/components/filterList/FilterList"
import { Cards } from "@/components/cards/cards"
import Button from "@/components/button/button"
import Link from "next/link"

import { useContext } from "react"
import { ModalContext } from "@/context/modalContext"

const Home = () => {
  const { filterDropdown,setFilterDropdown} = useContext(ModalContext)

  return (
    <main>
      <Header/>
      <main>
      <HomeHeader/>
      <section className="cars-section">
        <FilterList/>
        <div className="cars-page">
          <div className="cars-list">
            <Cards carro={{id: "1", name: "carro maneiro", brand: "string", year: "string", fuel: 10, "value": 100}}/>
            <Cards carro={{id: "1", name: "carro maneiro", brand: "string", year: "string", fuel: 10, "value": 100}}/>
            <Cards carro={{id: "1", name: "carro maneiro", brand: "string", year: "string", fuel: 10, "value": 100}}/>
            <Cards carro={{id: "1", name: "carro maneiro", brand: "string", year: "string", fuel: 10, "value": 100}}/>
            <Cards carro={{id: "1", name: "carro maneiro", brand: "string", year: "string", fuel: 10, "value": 100}}/>
          </div>
          <Button onClick={() => setFilterDropdown(true)} width={80} size="medium">Filtros</Button>
          <nav>
            <Link href="previous-page">{"<"} Anterior</Link>
            <p> <span>1</span> de 2 </p>
            <Link href="next-page">Seguinte {">"}</Link>
          </nav>
        </div>
      </section>
      </main>
      <Footer/>
    </main>
  )
}


export default Home