"use client"
import Modal from "./modal"
import { Input } from "../inputs/inputs"
import "../../styles/components/modals/editAddressModal.sass"
import Button from "../button/button"
import { useAuthContext } from "@/context/authContext"
import { useContext, useState } from "react"
import { ModalContext } from "@/context/modalContext"

const EditAddressModal = () => {

    const {user} = useAuthContext()
    const {setEditAddressModal} = useContext(ModalContext)
    
    const [zipCode, setZipCode] = useState<string>(user.address.zipCode)
    const [state, setState] = useState<string>(user.address.state)
    const [city, setCity] = useState<string>(user.address.city)
    const [street, setStreet] = useState<string>(user.address.street)
    const [number, setNumber] = useState<string>(user.address.number)
    const [complement, setComplement] = useState<string | undefined>(user.address.complement || undefined)

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
            console.log(cep)
            getCepAddress(cep)
        }
    }

    return(
        <Modal title="Editar endereço">
            <h2>Informações de endereço</h2>
            <form className="edit-address-form">
                <Input value={zipCode} onInput={onInputCep} onChange={(e) => setZipCode(e.target.value)}>
                    CEP
                </Input>
                <div className="two-input-cols">
                    <Input value={state} onChange={(e) => setState(e.target.value)}>
                        Estado
                    </Input>
                    <Input value={city} onChange={(e) => setCity(e.target.value)}>
                        Cidade
                    </Input>
                </div>
                <Input value={street} onChange={(e) => setStreet(e.target.value)}>
                    Rua
                </Input>
                <div className="two-input-cols">
                    <Input value={number} onChange={(e) => setNumber(e.target.value)}>
                        Número
                    </Input>
                    <Input value={complement} onChange={(e) => setComplement(e.target.value)}>
                        Complemento
                    </Input>
                </div>
                <div className="edit-address-buttons">
                    <Button onClick={()=> setEditAddressModal(false)} Style="negative-1">
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