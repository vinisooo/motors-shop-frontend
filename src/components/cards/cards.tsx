import Image from 'next/image'
import '../../styles/components/cards/cards.sass'

import { Elipsis, Tag } from "../tags/tags"
import { TCar } from '@/schemas/advertsSchema'
import Button from '../button/button'

interface props{
    car: TCar,
    username: string,
    owern?:boolean
    advertisement?: "ative" | "inative" | "cash"
    userId?:string
}


const Cards=({car,advertisement="ative", username,owern=false,userId}:props)=>{

    const{brand,year,price,color,coverImage:img,model,quilometers:km,description,isAvailable,fuel}=car

    return(
        <div className="product">
            <div className="img-product">
                <img src={img || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.vectorstock.com%2Fi%2F1000x1000%2F55%2F12%2Fcar-icon-line-drawing-symbol-vector-21085512.jpg&f=1&nofb=1&ipt=772d2f7a37024457b1ae4b5d5d4eb3f05cd78d354868efdbb54a91dcfcedebf5&ipo=images'} alt={`foto de ${model}`} />
                <Tag type={advertisement}>{advertisement}</Tag>
            </div>
            <div className="product-description">
                <h2>{brand} {model} {color}</h2>

                <p>{description}</p>
                {
                    !owern &&
                    <Elipsis className={userId} name={username}/>
                }
                <div className="product-infos">
                    <div className="km-year">
                        <Tag>{Number(km)}KM</Tag>
                        <Tag>{year}</Tag>
                    </div>
                    <span>RS:{price}</span>
                </div>
                {
                    owern &&
                    <div className='buttons'>
                        <Button style={'outline-brand-1'} size={'medium'}>Editar</Button>
                        <Button style={'outline-brand-1'} size={'medium'}>Ver Detalhes</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export {Cards}