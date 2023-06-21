import Image from 'next/image'
import '../../styles/components/cards/cards.sass'

import { Elipsis, Tag } from "../tags/tags"
import { TCar } from '@/schemas/advertsSchema'

interface props{
    car: TCar
    advertisement?: "ative" | "inative" | "cash"
}


const Cards=({car,advertisement="ative"}:props)=>{

    const{brand,year,price,color,coverImage:img,model,quilometers:km,description,isAvailable,fuel}=car

    
    return(
        <div className="product">
            <div className="img-product">
                <img src={img} alt="" />
                <Tag type={advertisement}>{advertisement}</Tag>
            </div>
            <div className="product-description">
                <h2>{`${brand} ${model} ${color}`}</h2>
                <p>{description}</p>
                <Elipsis name="Matheus Silva">MS</Elipsis>
                <div className="product-infos">
                    <div className="km-year">
                        <Tag>{km} km </Tag>
                        <Tag>{`${year} `}</Tag>
                    </div>
                    <span>RS:{price}</span>
                </div>
            </div>

        </div>
    )
}

export {Cards}