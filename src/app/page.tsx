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
import { iFilterListProps } from "@/components/filterList/FilterList"
import { iFilters } from "@/components/filterList/FilterList"

import FilterButton from "@/components/filterButton/filterButton"

import { use } from "react"

const getAdvertisements = async(searchParams: iFilters) => {
  const advertisements = await fetch("http://localhost:3001/adverts/?perPage=12");

  return advertisements.json()
}

const Home = async({searchParams}: iFilterListProps) => {
  const advertisements = await getAdvertisements(searchParams)
  console.log(advertisements)
  return (
    <>
      <Header/>
      <main>
      <HomeHeader/>
      <section className="cars-section">
        <FilterList searchParams={searchParams}/>
        <div className="cars-page">
          <div className="cars-list">
            {
              advertisements.adverts.map((ad: any) => {
                return(
                  <Cards carro={{id: ad.id, name: ad.model, brand: ad.brand, year: "string", fuel: 10, "value": 100}}/>
                )
              })
            }
          </div>
          <FilterButton/>
          {/* <Button onClick={() => setFilterDropdown(true)} width={80} size="medium">Filtros</Button> */}
          <nav>
            <Link href="previous-page">{"<"} Anterior</Link>
            <p> <span>1</span> de 2 </p>
            <Link href="next-page">Seguinte {">"}</Link>
          </nav>
        </div>
      </section>
      </main>
      <Footer/>
    </>
  )
}


export default Home