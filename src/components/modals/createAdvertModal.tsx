"use client"
import { ChangeEvent, EventHandler, useContext, useState } from "react"
import { createPortal } from "react-dom"
import { Input, Select, TextArea } from "../inputs/inputs"
import "../../styles/components/modals/createAdvertisementModal.sass"
import { useEffect, useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateAnnouncementData, CreateAnnouncementSchema } from "./validator"
import { TAdvertisementReq, advertisementReqSchema } from "@/schemas/advertisement.schema"
import Modal from "./modal"
import Button from "../button/button"
import { ModalContext } from "@/context/modalContext"
import { CarsContext, iCar } from "@/context/carsContext"


const CreateAdvertisementModal = ( ) => {

    const {setCreateAdvertModal} = useContext(ModalContext)

    const [brand, setBrand] = useState<string>("")
    const [fipe, setFipe] = useState<string>("")
    const [year, setYear] = useState<string>("")

    const [images, setImages] = useState<(string | null)[]>([])

    const {getCarsByBrand, cars} = useContext(CarsContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TAdvertisementReq>({
        resolver: zodResolver(advertisementReqSchema)
    })

    const onSubmitAd: SubmitHandler<any> = async(data) => {
        data.galleryAdvertisement = images.filter((image) => image !== null && image.trim() !== "")
        console.log(data)
    }

    const getFipePrice = (e:ChangeEvent<HTMLInputElement>) => {
        const foundCar = cars.find((car)=> {
            return car.name === e.target.value
        })
        if(foundCar) {
            if(foundCar.value){
                setFipe(foundCar.value.toString())
            }
            if(foundCar.year){
                setYear(foundCar.year.toString())
            }
        }
    }

    const addImageInput = () => {
        if(images.length <6){
            setImages([...images, null])
        }
    }
    const addImage = (e:ChangeEvent<HTMLInputElement>, index: number) => {
        let imagesAux = images.map((image,imageIndex) => {
            if(imageIndex === index){
                return image = e.target.value
            }
            return image
        })
        setImages(imagesAux)
        console.log(imagesAux)
    }
    console.log(errors)

    return (
        <Modal title="Cadastro de veículo">
            <form className="modal-form" onSubmit={handleSubmit(onSubmitAd)}>
                <h2>Informações do veículo</h2>
                <Input value={brand} onChangeCallBack={(e) => setBrand(e.target.value)} children="Marca" id="model" placeholder="Marca do Veículo" register={register("brand")} list="brands"/>
                <datalist id="brands">
                    <option value="outra">Outra</option>
                    <option value="audi">Audi</option>
                    <option value="chevrolet">Chevrolet</option>
                    <option value="ford">Ford</option>
                    <option value="honda">Honda</option>
                    <option value="hyundai">Hyundai</option>
                    <option value="nissan">Nissan</option>
                    <option value="toyota">Toyota</option>
                    <option value="volkswagen">Volkswagen</option>
                    <option value="fiat">Fiat</option>
                    <option value="peugeot">Peugeot</option>
                    <option value="renault">Renault</option>
                    <option value="citroën">Citroën</option>
                    <option value="subaru">Subaru</option>
                    <option value="mazda">Mazda</option>
                    <option value="mitsubishi">Mitsubishi</option>
                </datalist>
                {errors.brand && <span className="error">{errors.brand.message}</span>}
                <Input onClickCallBack={()=>getCarsByBrand(brand)} onChangeCallBack={(e)=>getFipePrice(e)} children="Modelo" id="model" placeholder="A 200 CGI ADVANCE SEDAN" register={register("model")} list="models"/>
                <datalist id="models">
                    {
                        cars?.map((car) => {
                            return(
                                <option value={car.name.toLowerCase()}>
                                    {car.name}
                                </option>
                            )
                        })
                    }
                </datalist>
                {errors.model && <span className="error">{errors.model.message}</span>}
                <div className="div-labels">
                    <div className="input-box">
                        <Input value={year} onChangeCallBack={(e) => setYear(e.target.value)} type="number" children="Ano" id="year" placeholder="2018" register={register("year", { valueAsNumber: true })}/>
                        {errors.year && <span className="error">{errors.year.message}</span>}
                    </div>
                    <div className="input-box">
                        <Select placeholder="combustível" label="Combustível" id="fuel" register={register("fuel")}>
                            <option>Insira o Combustível</option>
                            <option value="gasolina">Gasolina</option>
                            <option value="diesel">Diesel</option>
                            <option value="etanol">Etanol</option>
                            <option value="eletrecidade">Eletrecidade</option>
                            <option value="gás natural">Gás natural</option>
                        </Select>
                        {errors.fuel && <span className="error">{errors.fuel.message}</span>}
                    </div>
                </div>
                <div>
                    <div className="input-box">
                        <Input type="number" maxLength={10}  children="Quilometragem" id="quilometers" placeholder="30.000" register={register("quilometers", { valueAsNumber: true })}/>
                        {errors.quilometers && <span className="error">{errors.quilometers.message}</span>}
                    </div>
                    <div className="input-box">
                        <Input children="Cor" id="color" placeholder="Branco" register={register("color")} list="colors"/>
                        <datalist id="colors">
                            <option value="vermelho">Vermelho</option>
                            <option value="azul">Azul</option>
                            <option value="verde" >Verde</option>
                            <option value="amarelo">Amarelo</option>
                            <option value="laranja">Laranja</option>
                            <option value="rosa">Rosa</option>
                            <option value="roxo">Roxo</option>
                            <option value="preto">Preto</option>
                            <option value="branco">Branco</option>
                            <option value="cinza">Cinza</option>
                        </datalist>
                        {errors.color && <span className="error">{errors.color.message}</span>}
                    </div>
                </div>
                <div>
                    <div className="input-box">
                        <Input value={fipe} onChangeCallBack={(e)=>setFipe(e.target.value)} type="number" children="Preço tabela FIPE" id="fipePrice" placeholder="R$ 48.000,00" register={register("fipePrice", { valueAsNumber: true })} />
                        {errors.fipePrice && <span className="error">{errors.fipePrice.message}</span>}
                    </div>
                    <div className="input-box">
                        <Input type="number" children="Preço" id="price" placeholder="R$ 50.000,00" register={register("price", { valueAsNumber: true })}/>
                        {errors.price && <span className="error">{errors.price.message}</span>}
                    </div>
                </div>
                <TextArea children="Descrição" id="description" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et ante ac enim porta luctus. Sed leo est, tempus ac sapien ut, rhoncus ultrices mauris. Phasellus consectetur non neque at varius." register={register("description")}/>
                {errors.description && <span className="error">{errors.description.message}</span>}
                <Input children="Imagem da capa" id="coverImage" placeholder="https://image.com" register={register("coverImage")}/>
                {errors.coverImage && <span className="error">{errors.coverImage.message}</span>}
                {
                    images.map((image, index) => {
                        return(
                            <Input onChangeCallBack={(e:ChangeEvent<HTMLInputElement>)=>addImage(e, index)}>{`${index + 1}ª`} Imagem da galeria</Input>
                        )
                    })
                }
                {
                    images.length < 6 &&
                    <Button style="brand-opacity" type="button" onClick={addImageInput}>Adicionar campo para imagem da galeria</Button>   
                }
                <div className="modal-form-buttons">
                    <Button style="negative-1" type="button" onClick={()=>setCreateAdvertModal(false)} width={30}>Cancelar</Button>
                    <Button style="brand-1" type="submit" size="big" width={50}>Criar Anúncio</Button>
                </div>
            </form>
        </Modal>
    )
}

export {CreateAdvertisementModal}