import '../../../styles/components/loadings/cards/cardsLoading.sass'
import {BsFillImageFill} from 'react-icons/bs'


const CardLoading=()=>{
    return(
        <div id="loading" className="product">
            <i className="product-img"><BsFillImageFill/></i>
            <div className="product-infos">
                <div className="product-infos-name"/>
                <div className="product-infos-description"/>
                <div className="product-infos-advertiser">
                    <div className="product-infos-advertiser-elipse"/>
                    <div className="product-infos-advertiser-name"/>
                </div>
                <div className="product-infos-details">
                    <div className="product-infos-details-km"></div>
                    <div className="product-infos-details-year"></div>
                    <span className="product-infos-details-value"></span>
                </div>
                </div>
                <div className="product-infos-buttons">
                    <div className="buttons-editar"></div>
                    <div className="buttons-editar"></div>
                </div>
        </div>
    )
}

const CardsLoading=({cards=12}:{cards?:number})=>{

    return(
        <div className='cars-list'>
            {Array.from({ length: cards }).map((el)=><CardLoading/>)}
        </div>
    )
}

export {CardsLoading}