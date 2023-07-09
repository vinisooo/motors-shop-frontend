"use client"

import { TAdvertisementRes } from "@/types/advertisement.types"
import { Tag } from "../tags/tags"
import Button from "../button/button"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect } from "react"
import Link from "next/link"
import PageCard from "../pageCard/pageCard"
import Elipsis from "../tags/elipse"
import Autoplay from "embla-carousel-autoplay"
import nookies from "nookies"
import { useModalContext } from "@/context/modalContext"
import formatToPrice from "@/utils/formatToBrl"
import { useState } from "react"


const AdvertisementInfo = ({advertisement, userToken}:{advertisement:TAdvertisementRes, userToken?:string}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({delay: 2500})])
    const {setCarImageModal} = useModalContext()
    const [disabledMessage, setDisabledMessage] = useState(false)

    const {setCarImage} = useModalContext()

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes())
        }
    }, [emblaApi])

    let images = [advertisement.coverImage]
    
    if(advertisement.galleryAdvertisement){
        const galleryImages = advertisement.galleryAdvertisement.map((img: {id: string, imageUrl: string}) => {
            return img.imageUrl
        })
        images = [...images, ...galleryImages]
    }

    const setModalImageCallBack = (img: string) => {
        setCarImage(img)
        setCarImageModal(true)
    }

    return(
        <>
            <section className="advert-info">
                <div>
                    <PageCard className="cover-image">
                        <div className="embla" ref={emblaRef}>
                            <figure className="embla__container">
                                {
                                    images.map((img, index) => {
                                        if(typeof img === "string"){
                                            return(
                                                <img src={img} key={index} className="embla__slide"/>
                                            )
                                        }
                                    })
                                }
                            </figure>
                        </div>
                    </PageCard>
                    <PageCard className="advert-description">
                        <h1>{advertisement.brand} {advertisement.model} {advertisement.color}</h1>
                        <div>
                            <div className="year-km">
                                <Tag>{advertisement.year}</Tag>
                                <Tag>{advertisement.quilometers} KM</Tag>
                            </div>
                            <h3>{formatToPrice(advertisement.price)}</h3>
                        </div>
                        {
                            userToken ?
                                <Link className="buy-car" target="_blank" href={`http://api.whatsapp.com/send?1=pt_BR&phone=55${advertisement.user.phone}`}>Comprar</Link>
                            :     
                                <Button onClick={()=>setDisabledMessage(true)} Style="disabled">Comprar</Button>
                        }
                        {
                            disabledMessage &&
                            <span className="disabled-message error">Você precisa estar logado para comprar um veículo</span>
                        }
                    </PageCard>
                    {
                        advertisement.description &&
                        <PageCard className="advert-description">
                            <header>
                                <h4>Descrição</h4>
                            </header>
                            <p>{advertisement.description}</p>
                        </PageCard>
                    }
                </div>
                <aside>

                    <PageCard>
                        <header>
                            <h4>
                                Fotos
                            </h4>
                            <ul className="car-pics">
                                {
                                    images.map((img, index) => {
                                        if(typeof img === "string"){
                                            return (
                                                <li onClick={()=>setModalImageCallBack(img)} key={index}>
                                                    <figure className="car-pic">
                                                        <img src={img}/>
                                                    </figure>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </header>
                    </PageCard>
                    <PageCard className="advert-owner">
                        <Elipsis name={advertisement.user.name}></Elipsis>
                        <p className="user-description">{advertisement.user.description}</p>
                        <Button width={50}>
                            <Link target="_blank" href={`/user/${advertisement.user.id}`}>
                                Ver todos anúncios
                            </Link>
                        </Button>
                    </PageCard>
                </aside>
            </section>
        </>
    )
}

export default AdvertisementInfo