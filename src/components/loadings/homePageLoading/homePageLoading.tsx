import "../../../styles/components/loadings/homePageLoading/homePageLoading.sass"
import { CardsLoading } from "../cardsLoading/cardsLoading"
import { FilterLoading } from "../filterLoading/filterLoading"


const HomePageLoading=()=>{

    return(

        <div className="home">
            <aside>
                <FilterLoading/>
            </aside>
            <CardsLoading cards={6}/>
        </div>
    )
}

export {HomePageLoading}