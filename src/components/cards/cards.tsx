import '../../styles/components/cards/cards.sass'

import { Elipsis, Tag } from "../tag/tags"

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
}


const Cards=({carro}:props)=>{

    const{brand,year,value,name,fuel}=carro
    
    return(
        <div className="product">
            <div className="img-product">
                <img src='https://th.bing.com/th/id/OIP.C1qWSN1AqoIc8dcARjikywHaEo?pid=ImgDet&rs=1' alt="" />
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