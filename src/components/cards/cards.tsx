"use client"
import '../../styles/components/cards/cards.sass'
import { Tag } from "../tags/tags"
import { TCar } from '@/schemas/advertsSchema'
import Button from '../button/button'
import { TUser } from '@/schemas/userSchema'
import Elipsis from '../tags/elipse'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Modal } from '../modal/modalBase/modal'
import { EditAdvertForm } from '../forms/adverts/editAdvertForm'

interface props{
    car: TCar,
    user?: TUser,
    advertisement?: "ative" | "inative" | "cash"
    anunciant:TUser
}


const Cards=({car,advertisement="ative", user,anunciant}:props)=>{


    const router=useRouter()
    const owern= anunciant.id==user?.id

    const{brand,year,price,color,coverImage:img,model,quilometers:km,description,isAvailable,fuel, id}=car

    const detalhes=()=>{
        router.push(`/advertisements/${car.id}`)
    }

    return(
        <div className="product">
            <Link href={`/advertisements/${id}`}>
                <div className="img-product">
                    <img className={car.id} src={img} alt={`foto de ${model}`} />
                    <Tag type={advertisement}>{advertisement}</Tag>
                </div>
            </Link>
            <div className="product-description">
                <Link href={`/advertisements/${id}`}>
                    <h2>{brand} {model} {color}</h2>
                </Link>

                <p>{description}</p>
                {
                    !owern &&
                    <Elipsis className={anunciant.id} name={anunciant.name}/>
                }
                <div className="product-infos">
                    <div className="km-year">
                        <Tag>{Number(km)}KM</Tag>
                        <Tag>{year}</Tag>
                    </div>
                    <span>R${Number(price).toFixed(0)}</span>
                </div>
                {
                    owern &&
                    <div className='buttons'>
                        <Modal modalContent={<EditAdvertForm car={car}/>} title='Editar Anuncio' >
                            <Button Style={'outline-brand-1'} size={'medium'}>Editar</Button>
                        </Modal>
                        <Button onClick={detalhes} Style={'outline-brand-1'} size={'medium'}>Ver Detalhes</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export {Cards}