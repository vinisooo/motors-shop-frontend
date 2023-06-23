import Image from 'next/image'
import '../../styles/components/cards/cards.sass'

import { Elipsis, Tag } from "../tags/tags"

interface carro{
    "id": string
    "model": string,
    "brand": string,
    "year": number,
    "fuel": string,
    "price": number,
    "coverImage": string,
    "description": string,
    "quilometers": number
}

interface props{
    carro: carro,
    username: string,
    advertisement?: "ative" | "inative" | "cash"
}


const Cards=({carro,advertisement="ative", username}:props)=>{

    const{brand,year,model,price,fuel, coverImage, description, quilometers,}=carro
    
    return(
        <div className="product">
            <div className="img-product">
                <img src={coverImage} alt={`foto de ${model}`} />
                <Tag type={advertisement}>{advertisement}</Tag>
            </div>
            <div className="product-description">
                <h2>{model}</h2>
                <p>{description}</p>
                <Elipsis name={username}/>
                <div className="product-infos">
                    <div className="km-year">
                        <Tag>{Number(quilometers)}KM</Tag>
                        <Tag>{year}</Tag>
                    </div>
                    <span>R${price}</span>
                </div>
            </div>

        </div>
    )
}

export {Cards}