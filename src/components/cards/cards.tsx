"use client"
import '../../styles/components/cards/cards.sass'
import { Tag } from "../tags/tags"
import { TCar } from '@/schemas/advertsSchema'
import Button from '../button/button'
import { TUser } from '@/schemas/userSchema'
import Elipsis from '../tags/elipse'

interface props{
    car: TCar,
    user: TUser,
    advertisement?: "ative" | "inative" | "cash"
    userId?:string
}


const Cards=({car,advertisement="ative", user,userId}:props)=>{

    const owern= userId==user.id

    const{brand,year,price,color,coverImage:img,model,quilometers:km,description,isAvailable,fuel}=car

    const editar=()=>{
        console.log('editar')
    }

    const detalhes=()=>{
        console.log('detalhes')
    }

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
                    <Elipsis className={user.id} name={user.name}/>
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
                        <Button onClick={editar} style={'outline-brand-1'} size={'medium'}>Editar</Button>
                        <Button onClick={detalhes} style={'outline-brand-1'} size={'medium'}>Ver Detalhes</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export {Cards}