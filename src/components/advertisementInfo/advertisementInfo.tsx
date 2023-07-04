"use client"
import { TAdvertisementRes } from "@/schemas/advertisement.schema"
import { Tag } from "../tags/tags"
import Button from "../button/button"
import useEmblaCarousel from "embla-carousel-react"
import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import PageCard from "../pageCard/pageCard"
import Elipsis from "../tags/elipse"
import Autoplay from "embla-carousel-autoplay"
import nookies from "nookies"
import { useModalContext } from "@/context/modalContext"

const AdvertisementInfo = ({advertisement}:{advertisement:TAdvertisementRes}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({delay: 2500})])
    const {carImageModal, setCarImageModal} = useModalContext()

    const {setCarImage} = useModalContext()
    const userToken = nookies.get()["userToken"]

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes())
        }
    }, [emblaApi])

    let images = [advertisement.coverImage]
    
    if(advertisement.galleryAdvertisement){
        const galleryImages = advertisement.galleryAdvertisement.map((img) => {
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
                                        return(
                                            <img src={img} key={index} className="embla__slide"/>
                                            )
                                    })
                                }
                            </figure>
                        </div>
                    </PageCard>
                    <PageCard className="advert-description">
                        <h1>{advertisement.model}</h1>
                        <div>
                            <div className="year-km">
                                <Tag>{advertisement.year}</Tag>
                                <Tag>{advertisement.quilometers} KM</Tag>
                            </div>
                            <h3>R$ {advertisement.price}</h3>
                        </div>
                        <Button Style={!userToken ? "disabled" : undefined}>
                            {
                                userToken
                                ?
                                    <Link target="_blank" href={`http://api.whatsapp.com/send?1=pt_BR&phone=55${advertisement.user.phone}`}>Comprar</Link>
                                :
                                    <Link href="" className="disabled" title="Efetue o login para entrar em contato com o vendedor">Comprar</Link>
                            }
                        </Button>
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
                                        return (
                                            <li onClick={()=>setModalImageCallBack(img)} key={index}>
                                                <figure className="car-pic">
                                                    <img src={img}/>
                                                </figure>
                                            </li>
                                        )
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