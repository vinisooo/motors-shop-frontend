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
  try{
    const advertisements = await fetch(`http://localhost:3001/adverts/?perPage=12&${params}`, {
      next: {
        revalidate: 20
      }
    });
    return await advertisements.json()

  }catch(err: unknown){
    console.log(err)
  }
}

const getNotPaginated = async() => {
  try{
    const notPaginatedAdverts = await fetch(`http://localhost:3001/adverts/?perPage=999`, {
      next: {
        revalidate: 60
      }
    });

    return await notPaginatedAdverts.json()
  }catch(err: unknown){
    console.log(err)
  }
}

const Home = async({searchParams}: iFilterListProps) => {
  const advertisements = await getAdvertisements(searchParams)
  const notPaginatedAdverts = await getNotPaginated()

  return (
    <>
      <Header/>
      <main>
      <HomeHeader/>
      <section className="cars-section">
        <FilterList searchParams={searchParams} advertisements={notPaginatedAdverts}/>
        <div className="cars-page">
          <div className="cars-list">
            {
              advertisements?.count > 0 &&
              advertisements?.adverts.map((ad: any) => {
                return(
                  <Cards carro={ad}/>
                )
              })
            }
          </div>
          <FilterButton/>
          <nav>
            {
              advertisements?.prev !== null &&
              <Link href={{
                query: {
                  ...searchParams,
                  page: advertisements?.prev ? advertisements?.prev[advertisements?.prev.length - 1] : ""
                }
              }}>{"<"} Anterior</Link>
            }
            <p> <span>{searchParams?.page ? searchParams?.page : "1"}</span> de {advertisements?.maxPage} </p>
            {
              advertisements?.next !== null &&
              <Link href={{
                query: {
                  ...searchParams,
                  page: advertisements?.next ? advertisements?.next[advertisements?.next.length - 1] : ""
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