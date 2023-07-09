"use client"

import "../../styles/components/cards/cards.sass"
import { Tag } from "../tags/tags"
import { TCar } from "@/types/advertisement.types"
import Button from "../button/button"
import { TUser } from "@/types/user.types"
import Elipsis from "../tags/elipse"
import Link from "next/link"
import { useRouter } from "next/navigation"
import formatToPrice from "@/utils/formatToBrl"
import getRandomColor from "@/utils/randomElipsisColor"
import { useModalContext } from "@/context/modalContext"
import { useCarsContext } from "@/context/carsContext"
import EditAdvertModal from "../modals/editAdvertModal"

interface props{
    car: TCar,
    user?: TUser,
    advertisement?: "ative" | "inative" | "cash"
    anunciant:TUser
}

const Cards=({car,advertisement="ative", user,anunciant}:props)=>{

    const {setEditAdvertModal} = useModalContext()
    const {setCurrentAdvert} = useCarsContext() 


    const router=useRouter()
    const owner= anunciant.id==user?.id

    const{brand, year, price, color, coverImage:img ,
        model, quilometers:km, description, id}=car

    const detalhes=()=>{
        router.push(`/advertisements/${car.id}`)
    }

    if(!car.isAvailable && !owner){
        return <></>
    }


    const openEditModal = () => {
        setCurrentAdvert(car)
        setEditAdvertModal(true)
    }

    return(
        <>
            <div className="product">
                <Link href={`/advertisements/${id}`}>
                    <div className="img-product">
                        <img className={car.id} src={img}/>
                        <Tag type={car.isAvailable ? "ative" : "inative"}>{advertisement}</Tag>
                        {
                            car.fipeDeal &&
                            <Tag type="cash">{"cash"}</Tag>
                        }
                    </div>
                </Link>
                <div className="product-description">
                    <Link href={`/advertisements/${id}`}>
                        <h4 title={`${brand} ${model} ${color}`}>{brand} {model} {color}</h4>
                    </Link>

                    <p>{description}</p>
                    {
                        !owner &&
                        <Elipsis color={getRandomColor()} className={anunciant.id} name={anunciant.name}/>
                    }
                    <div className="product-infos">
                        <div className="km-year">
                            <Tag>{Number(km)}KM</Tag>
                            <Tag>{year}</Tag>
                        </div>
                        <span>{formatToPrice(price)}</span>
                    </div>
                    {
                        owner &&
                        <div className='buttons'>
                            <Button onClick={openEditModal} Style={'outline-brand-1'} size={'medium'}>Editar</Button>
                            <Button onClick={detalhes} Style={'outline-brand-1'} size={'medium'}>Ver Detalhes</Button>
                        </div>
                    }
                </div>
            </div>
            <EditAdvertModal/>
        </>
    )
}

export {Cards}