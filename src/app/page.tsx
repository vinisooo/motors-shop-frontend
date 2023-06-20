import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import HomeHeader from "@/components/homeHeader/HomeHeader"
import "../styles/pages/home/home.sass"
import FilterList from "@/components/filterList/FilterList"
import { Cards } from "@/components/cards/cards"
import Link from "next/link"

import { iFilterListProps } from "@/components/filterList/FilterList"
import { iFilters } from "@/components/filterList/FilterList"

import FilterButton from "@/components/filterButton/filterButton"

const getAdvertisements = async(searchParams: iFilters) => {
  let params: URLSearchParams | string = new URLSearchParams();

  for (const key in searchParams) {
    if (searchParams.hasOwnProperty(key) && searchParams[key] !== undefined) {
      params.append(key, searchParams[key]!);
    }
  }
  const advertisements = await fetch(`http://localhost:3001/adverts/?perPage=12&${params}`);

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
              advertisements.count > 0 &&
              advertisements.adverts.map((ad: any) => {
                return(
                  <Cards carro={{id: ad.id, name: ad.model, brand: ad.brand, year: "string", fuel: ad.fuel, "value": ad.price}}/>
                )
              })
            }
          </div>
          <FilterButton/>
          {/* <Button onClick={() => setFilterDropdown(true)} width={80} size="medium">Filtros</Button> */}
          <nav>
            {
              advertisements.prev !== "null" &&
              <Link href={{
                query: {
                  ...searchParams,
                  page: advertisements.prev ? advertisements.prev[advertisements.prev.length - 1] : ""
                }
              }}>{"<"} Anterior</Link>
            }
            <p> <span>{searchParams.page ? searchParams.page : "1"}</span> de 20 </p>
            {
              advertisements.count === 12 &&
              <Link href={{
                query: {
                  ...searchParams,
                  page: advertisements.next ? advertisements.next[advertisements.next.length - 1] : ""
                }
              }}>Seguinte {">"}</Link>
            }
          </nav>
        </div>
      </section>
      </main>
      <Footer/>
    </>
  )
}


export default Home