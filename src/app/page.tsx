import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import HomeHeader from "@/components/homeHeader/HomeHeader"
import "../styles/pages/home/home.sass"
import { cookies } from "next/headers"
import HeaderProfile from "@/components/headerProfile/header"
import { Suspense } from "react"
import CarsHome from "@/components/cardsList/carsHome"
import { HomePageLoading } from "@/components/loadings/homePageLoading/homePageLoading"
import HeaderHandler from "@/components/header/headerHandler"
import { iFilters } from "@/components/filterList/FilterList"

const Home = async({searchParams}: {searchParams: iFilters}) => {

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