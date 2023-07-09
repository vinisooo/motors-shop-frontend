import Footer from "@/components/footer/footer"
import HomeHeader from "@/components/homeHeader/HomeHeader"
import "../styles/pages/home/home.sass"
import { Suspense } from "react"
import CarsHome from "@/components/cardsList/carsHome"
import { HomePageLoading } from "@/components/loadings/homePageLoading/homePageLoading"
import { IFilters } from "@/components/filterList/FilterList"

const Home = async({searchParams}: {searchParams: IFilters}) => {

  return (
    <>
      <main className="page-show-up">
        <HomeHeader/>
        <section className="cars-section">
          <Suspense fallback={<HomePageLoading/>}>
            <CarsHome searchParams={searchParams}/>
          </Suspense>
        </section>
      </main>
      <Footer/>
    </>
  )
}


export default Home