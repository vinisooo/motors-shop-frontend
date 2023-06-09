import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import HomeHeader from "@/components/homeHeader/HomeHeader"
import "../styles/pages/home/home.sass"
import FilterList from "@/components/filterList/FilterList"

const Home=()=>{
  return (
    <main >
      <Header/>
      <main>
        <HomeHeader/>
      </main>
      <section className="cars-section">
        <FilterList/>
      </section>
      <Footer/>
    </main>
  )
}


export default Home