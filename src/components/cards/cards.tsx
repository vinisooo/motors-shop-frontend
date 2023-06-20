import Image from 'next/image'
import '../../styles/components/cards/cards.sass'

import { Elipsis, Tag } from "../tags/tags"

interface carro{
    "id": string
    "name": string,
    "brand": string,
    "year": string,
    "fuel": number,
    "value": number
}

interface props{
    carro: carro
    advertisement?: "ative" | "inative" | "cash"
}


const Cards=({carro,advertisement="ative"}:props)=>{

    const{brand,year,value,name,fuel}=carro
    
    return(
        <div className="product">
            <div className="img-product">
                <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.vectorstock.com%2Fi%2F1000x1000%2F55%2F12%2Fcar-icon-line-drawing-symbol-vector-21085512.jpg&f=1&nofb=1&ipt=772d2f7a37024457b1ae4b5d5d4eb3f05cd78d354868efdbb54a91dcfcedebf5&ipo=images' alt="" />
                <Tag type={advertisement}>{advertisement}</Tag>
            </div>
            <div className="product-description">
                <h2>{`${name}`}</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...</p>
                <Elipsis name="Matheus Silva">MS</Elipsis>
                <div className="product-infos">
                    <div className="km-year">
                        <Tag>0KM</Tag>
                        <Tag>{`${year} `}</Tag>
                    </div>
                    <span>RS:{`${value}`}</span>
                </div>
            </div>

        </div>
    )
}

export {Cards}