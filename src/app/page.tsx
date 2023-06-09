import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import HomeHeader from "@/components/homeHeader/HomeHeader"
import "../styles/pages/home/home.sass"
import FilterList from "@/components/filterList/FilterList"
import { Cards } from "@/components/cards/cards"

const Home=()=>{
  return (
    <main >
      <Header/>
      <main>
        <HomeHeader/>
      </main>
      <section className="cars-section">
        <FilterList/>
        <div className="cars-list">
          <Cards carro={{id: "1", name: "carro maneiro", brand: "string", year: "string", fuel: 10, "value": 100}}/>
          <Cards carro={{id: "1", name: "carro maneiro", brand: "string", year: "string", fuel: 10, "value": 100}}/>
          <Cards carro={{id: "1", name: "carro maneiro", brand: "string", year: "string", fuel: 10, "value": 100}}/>
          <Cards carro={{id: "1", name: "carro maneiro", brand: "string", year: "string", fuel: 10, "value": 100}}/>
          <Cards carro={{id: "1", name: "carro maneiro", brand: "string", year: "string", fuel: 10, "value": 100}}/>

        </div>
      </section>
      <Footer/>
    </main>
  )
}


export default Home