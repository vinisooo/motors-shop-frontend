import { TAdvertisementRes } from "@/schemas/advertisement.schema"
import FilterList, { iFilterListProps, iFilters } from "../filterList/FilterList"
import Link from "next/link"
import { Cards } from "../cards/cards"
import { Car } from "@/schemas/advertsSchema"
import FilterButton from "../filterButton/filterButton"
import "../../styles/pages/home/home.sass"

const getAdvertisements = async(searchParams: iFilters) => {
    let params: URLSearchParams | string = new URLSearchParams()
  
    for (const key in searchParams) {
      if (searchParams.hasOwnProperty(key) && searchParams[key] !== undefined) {
        params.append(key, searchParams[key]!)
      }
    }
    try{
      const advertisements = await fetch(`http://localhost:3001/adverts/?perPage=12&${params}`, {
        next: {
          revalidate: 20
        }
      })
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
      })
  
      return await notPaginatedAdverts.json()
    }catch(err: unknown){
      console.log(err)
    }
}

const CarsHome=async({searchParams}:{searchParams:iFilters})=>{

    const advertisements = await getAdvertisements(searchParams)
    const notPaginatedAdverts: TAdvertisementRes[] = await getNotPaginated()

    return (
        <>
            <FilterList searchParams={searchParams} advertisements={notPaginatedAdverts}/> 
            <div className="cars" id="filter-applied">
              <div className="cars-page">
                  <div className="cars-list">
                      {
                        advertisements?.count > 0 
                        ?
                        advertisements?.adverts.map((ad: TAdvertisementRes) => {
                          return(
                              <Cards key={ad.id} car={ Car.parse(ad)} anunciant={ad.user}/>
                          )
                        })
                        :
                        <h1>Não encontrado nenhum carro com esses filtros</h1>
                      }
                  </div>
                  <FilterButton/>
              </div>
              {
                advertisements?.count>0 &&
                (<nav>
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
              </nav>)

              }
              
            </div>
        </>
    )

}

export default CarsHome