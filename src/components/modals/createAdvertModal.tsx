"use client"
import { useContext, useState } from "react"
import { createPortal } from "react-dom"
import { Input, TextArea } from "../inputs/inputs"
import "../../styles/components/modals/createAdvertisementModal.sass"
import { useEffect, useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateAnnouncementData, CreateAnnouncementSchema } from "./validator"
import { TAdvertisementReq, advertisementReqSchema } from "@/schemas/advertisement.schema"
import Modal from "./modal"
import Button from "../button/button"
import { ModalContext } from "@/context/modalContext"


const CreateAdvertisementModal = ( ) => {

    const {setCreateAdvertModal} = useContext(ModalContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TAdvertisementReq>({
        resolver: zodResolver(advertisementReqSchema)
    })

    const createAds: SubmitHandler<any> = async(data) => {
        console.log(data)
    }

    return (
        <Modal title="Cadastro de veículo">
            <form className="modal-form" onSubmit={handleSubmit(createAds)}>
                <h2>Informações do veículo</h2>
                <Input children="Marca" id="brand" placeholder="Mercedes Benz" register={register("brand")}/>
                <Input children="Modelo" id="model" placeholder="A 200 CGI ADVANCE SEDAN" register={register("model")}/>
                <div className="div-labels">
                    <Input children="Ano" id="year" placeholder="2018" register={register("year")}/>
                    <Input children="Combustível" id="fuel" placeholder="Gasolina / Etanol" register={register("fuel")}/>
                </div>
                <div>
                    <Input children="Quilometragem" id="quilometers" placeholder="30.000" register={register("quilometers")}/>
                    <Input children="Cor" id="color" placeholder="Branco" register={register("color")}/>
                </div>
                <div>
                    <Input children="Preço tabela FIPE" id="fipePrice" placeholder="R$ 48.000,00" register={register("fipePrice")} />
                    <Input children="Preço" id="price" placeholder="R$ 50.000,00" register={register("price")}/>
                </div>
                <TextArea children="Descrição" id="description" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et ante ac enim porta luctus. Sed leo est, tempus ac sapien ut, rhoncus ultrices mauris. Phasellus consectetur non neque at varius." {...register("description")}/>
                <Input children="Imagem da capa" id="coverImage" placeholder="https://image.com" register={register("coverImage")}/>
                {/* <Input children="1ª imagem da galeria" id="firstGalleryImage" placeholder="https://image.com"/>
                <Input children="2ª imagem da galeria" id="secondGalleryImage" placeholder="https://image.com"/> */}
                <Button style="brand-opacity">Adicionar campo para imagem da galeria</Button>   
                <div className="modal-form-buttons">
                    <Button style="negative-1" type="button" onClick={()=>setCreateAdvertModal(false)} width={30}>Cancelar</Button>
                    <Button style="brand-1" type="submit" size="big" width={50}>Criar Anúncio</Button>
                </div>
            </form>
        </Modal>
    )
}

export {CreateAdvertisementModal}