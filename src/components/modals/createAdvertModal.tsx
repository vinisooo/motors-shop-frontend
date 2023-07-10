"use client"

import { ChangeEvent, useState } from "react"
import { Input, Select, TextArea } from "../inputs/inputs"
import "../../styles/components/modals/createAdvertisementModal.sass"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { advertisementReqSchema } from "@/schemas/advertisement.schema"
import { TAdvertisementReq } from "@/types/advertisement.types"
import Modal from "./modal"
import Button from "../button/button"
import { useModalContext } from "@/context/modalContext"
import { useCarsContext} from "@/context/carsContext"


const CreateAdvertisementModal = ( ) => {
    const {setCreateAdvertModal} = useModalContext()

    const [brand, setBrand] = useState<string>("")
    const [fipe, setFipe] = useState<number>(0)
    const [year, setYear] = useState<number>(0)

    const [images, setImages] = useState<(FileList | null)[]>([])

    const {getCarsByBrand, cars, postAdvertisement} = useCarsContext()


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TAdvertisementReq>({
        resolver: zodResolver(advertisementReqSchema)
    })

    const onSubmitAd: SubmitHandler<any> = async(data) => {
        const mergedFiles = images.map((fileList) => Array.from(fileList || [])).flat()
        data.galleryAdvertisement = mergedFiles
        data.year = Number(year)
        data.fipeDeal = data.price < Number(fipe)
        data.coverImage = data.coverImage[0]
        postAdvertisement(data)
    }

    const getFipePrice = (e:ChangeEvent<HTMLInputElement>) => {
        const foundCar = cars.find((car)=> {
            return car.name === e.target.value
        })
        if(foundCar) {
            if(foundCar.value){
                setFipe(foundCar.value)
            }
            if(foundCar.year){
                setYear(foundCar.year)
            }
        }
    }

    const addImageInput = () => {
        if(images.length < 6){
            setImages([...images, null])
        }
    }
    const addImage = (e:ChangeEvent<HTMLInputElement>, index: number) => {
        let imagesAux = images.map((image,imageIndex) => {
            if(imageIndex === index){
                return image = e.target.files
            }
            return image
        })
        setImages(imagesAux)
        console.log(imagesAux)
    }


    return (
        <Modal title="Cadastro de veículo">
            <form encType="multipart/form-data" className="modal-form" onSubmit={handleSubmit(onSubmitAd)}>
                <h2>Informações do veículo</h2>
                <Input value={brand} onChange={(e) => setBrand(e.target.value)} children="Marca" id="model" placeholder="Marca do Veículo" register={register("brand")} list="brands"/>
                <datalist id="brands">
                    <option value="outra">Outra</option>
                    <option value="audi">Audi</option>
                    <option value="bmw">BMW</option>
                    <option value="citroën">Citroën</option>
                    <option value="chevrolet">Chevrolet</option>
                    <option value="fiat">Fiat</option>
                    <option value="ford">Ford</option>
                    <option value="honda">Honda</option>
                    <option value="hyundai">Hyundai</option>
                    <option value="mazda">Mazda</option>
                    <option value="mitsubishi">Mitsubishi</option>
                    <option value="nissan">Nissan</option>
                    <option value="peugeot">Peugeot</option>
                    <option value="renault">Renault</option>
                    <option value="subaru">Subaru</option>
                    <option value="toyota">Toyota</option>
                    <option value="volkswagen">Volkswagen</option>
                </datalist>
                {errors.brand && <span className="error">{errors.brand.message}</span>}
                <Input onClick={()=>getCarsByBrand(brand)} onChange={(e)=>getFipePrice(e)} children="Modelo" id="model" placeholder="Modelo do veículo" register={register("model")} list="models"/>
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
                        <Input value={year?.toString()} onChange={(e) => setYear(Number(e.target.value))} type="number"  min="1900" max="2099"  children="Ano" id="year" placeholder="Ano do veículo"  register={register("year", { valueAsNumber: true })}/>
                        {errors.year && <span className="error">{errors.year.message}</span>}
                    </div>
                    <div className="input-box">
                        <Select placeholder="Combustível" label="Combustível" id="fuel" register={register("fuel")}>
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
                        <Input type="number" maxLength={10} min={0}  children="Quilometragem" id="quilometers" placeholder="Quilometragem" register={register("quilometers", { valueAsNumber: true })}/>
                        {errors.quilometers && <span className="error">{errors.quilometers.message}</span>}
                    </div>
                    <div className="input-box">
                        <Input children="Cor" id="color" placeholder="Cor do veículo" register={register("color")} list="colors"/>
                        <datalist id="colors">
                            <option value="Vermelho">Vermelho</option>
                            <option value="Azul">Azul</option>
                            <option value="Verde" >Verde</option>
                            <option value="Amarelo">Amarelo</option>
                            <option value="Laranja">Laranja</option>
                            <option value="Rosa">Rosa</option>
                            <option value="Roxo">Roxo</option>
                            <option value="Preto">Preto</option>
                            <option value="Branco">Branco</option>
                            <option value="Cinza">Cinza</option>
                        </datalist>
                        {errors.color && <span className="error">{errors.color.message}</span>}
                    </div>
                </div>
                <div>
                    <div className="input-box">
                        <Input onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.slice(0, 9)} value={fipe.toString()} onChange={(e)=>setFipe(Number(e.target.value))} min={0} type="number" children="Preço tabela FIPE" id="fipePrice" placeholder="R$ 48.000,00" register={register("fipePrice", { valueAsNumber: true })} />
                        {errors.fipePrice && <span className="error">{errors.fipePrice.message}</span>}
                    </div>
                    <div className="input-box">
                        <Input onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.slice(0, 9)} type="number" children="Preço" id="price" placeholder="Preço. Ex: 50000 (50 mil)" min={0} register={register("price", { valueAsNumber: true })}/>
                        {errors.price && <span className="error">{errors.price.message}</span>}
                    </div>
                </div>
                <TextArea children="Descrição" id="description" placeholder="Escreva uma descrição sobreo veículo." register={register("description")}/>
                {errors.description && <span className="error">{errors.description.message}</span>}
                <Input required name="coverImage" type="file" accept="image/*" children="Imagem da capa" id="coverImage" register={register("coverImage")}/>
                {
                    images.map((image, index) => {
                        return(
                            <Input type="file" accept="image/*" onChange={(e:ChangeEvent<HTMLInputElement>)=>addImage(e, index)}>{`${index + 1}ª`} Imagem da galeria</Input>
                        )
                    })
                }
                {
                    images.length < 6 &&
                    <Button Style="brand-opacity" type="button" onClick={addImageInput}>Adicionar campo para imagem da galeria</Button>   
                }
                <div className="modal-form-buttons">
                    <Button Style="negative-1" type="button" onClick={()=>setCreateAdvertModal(false)} width={30}>Cancelar</Button>
                    <Button Style="brand-1" type="submit" size="big" width={50}>Criar Anúncio</Button>
                </div>
            </form>
        </Modal>
    )
}

export {CreateAdvertisementModal}