import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import HomeHeader from "@/components/homeHeader/HomeHeader"
import "../styles/pages/home/home.sass"
import { iFilterListProps } from "@/components/filterList/FilterList"
import { cookies } from "next/headers"
import HeaderProfile from "@/components/headerProfile/header"
import { Suspense } from "react"
import CarsHome from "@/components/cardsList/carsHome"
import { HomePageLoading } from "@/components/loadings/homePageLoading/homePageLoading"

const getUser=()=>{
  const userToken=cookies().get("userToken")
  return userToken
}

const Home = async({searchParams}: iFilterListProps) => {
  const userToken=getUser()

  return (
    <>
      {
        !userToken ?
        <Header/> : <HeaderProfile/>
      }
      <main>
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