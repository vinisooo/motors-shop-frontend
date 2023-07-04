"use client"
import Modal from "./modal"
import { Input } from "../inputs/inputs"
import "../../styles/components/modals/editAddressModal.sass"
import Button from "../button/button"
import { useUserContext } from "@/context/userContext"
import { useState } from "react"
import { useModalContext } from "@/context/modalContext"
import { TAddressUpdateReq } from "@/types/address.types"
import { addressReqUpdateSchema } from "@/schemas/address.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

const EditAddressModal = () => {
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TAddressUpdateReq>({
        resolver: zodResolver(addressReqUpdateSchema)
    })

    const {user, editAddress} = useUserContext()
    const {setEditAddressModal} = useModalContext()
    
    const [zipCode, setZipCode] = useState<string>(user.address.zipCode || "")
    const [state, setState] = useState<string>(user.address.state || "")
    const [city, setCity] = useState<string>(user.address.city || "")
    const [street, setStreet] = useState<string>(user.address.street || "")
    const [number, setNumber] = useState<string>(user.address.number || "")
    const [complement, setComplement] = useState<string | undefined>(user.address.complement || "")

    const submitUpdateAddress: SubmitHandler<any> = (data) => {
        data = {
            ...data,
            city: city || data.city,
            state: state || data.state,
            street: street || data.street,
            complement: complement || data.complement
        }
        editAddress(user.address.id, data)

        setEditAddressModal(false)
    }

    const getCepAddress = async(cep: string) => {
        try{
            const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

            const response = await request.json()
            setState(response.uf)
            setCity(response.localidade)
            setStreet(response.logradouro)
            setComplement(response.complement)
        }catch(err: unknown){
            console.log(err)
        }
    }

    const onInputCep = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value

        e.target.value = cep.slice(0, 8)
        if(cep.length === 8){
            getCepAddress(cep)
        }
    }
    

    return(
        <Modal title="Editar endereço">
            <h2>Informações de endereço</h2>
            <form onSubmit={handleSubmit(submitUpdateAddress)} className="edit-address-form">
                <Input value={zipCode} register={register("zipCode")} onInput={onInputCep} onChange={(e) => setZipCode(e.target.value)}>
                    CEP
                </Input>
                {errors.zipCode && <span className="error">{errors.zipCode.message}</span>}
                <div className="two-input-cols">
                    <Input value={state} register={register("state")} maxLength={2} onChange={(e) => setState(e.target.value)}>
                        Estado
                    </Input>
                    {errors.state && <span className="error">{errors.state.message}</span>}
                    <Input value={city} maxLength={100} register={register("city")} onChange={(e) => setCity(e.target.value)}>
                        Cidade
                    </Input>
                    {errors.city && <span className="error">{errors.city.message}</span>}
                </div>
                <Input maxLength={100} value={street} register={register("street")} onChange={(e) => setStreet(e.target.value)}>
                    Rua
                </Input>
                {errors.street && <span className="error">{errors.street.message}</span>}
                <div className="two-input-cols">
                    <Input value={number} register={register("number")} onChange={(e) => setNumber(e.target.value)}>
                        Número
                    </Input>
                    {errors.number && <span className="error">{errors.number.message}</span>}
                    <Input maxLength={100} value={complement} register={register("complement")} onChange={(e) => setComplement(e.target.value)}>
                        Complemento
                    </Input>
                    {errors.complement && <span className="error">{errors.complement.message}</span>}
                </div>
                <div className="edit-address-buttons">
                    <Button type="button" onClick={()=> setEditAddressModal(false)} Style="negative-1">
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Salvar alterações
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default EditAddressModal