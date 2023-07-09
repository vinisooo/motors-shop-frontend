"use client"

import { Dispatch, SetStateAction, createContext, useContext } from "react"
import { useState } from "react"
import { AxiosResponse } from "axios"
import nookies from "nookies"
import { TAdvertisementReq, TAdvertisementReqUpdate, TAdvertisementRes, TCar } from "@/types/advertisement.types"
import api, { carsApi } from "@/services"
import { useModalContext } from "./modalContext"
import {toast} from "react-toastify"
import { useRouter } from "next/navigation"

interface IChildrenProps {
  children: React.ReactNode
}

interface IModalContextValues {
  getCarsByBrand: (brand?: string) => Promise<void>
  cars: ICar[]
  deleteAdvert: (id: string) => Promise<void>
  postAdvertisement: (data: TAdvertisementReq) => Promise<AxiosResponse<TAdvertisementRes, any> | undefined>
  editAdvert: (id: string, data: TAdvertisementReqUpdate) => Promise<void>
  currentAdvert: TCar | null
  setCurrentAdvert: Dispatch<SetStateAction<TCar| null>>
}

export const CarsContext = createContext({} as IModalContextValues)

export interface ICar {
  name: string
  value?: number
  year?: number
}


export const CarsProvider = ({ children }: IChildrenProps) => {
  const [cars, setCars] = useState<ICar[]>([])
  const {setCreateAdvertModal} = useModalContext()
  const [currentAdvert, setCurrentAdvert] = useState<TCar | null>(null)

  const token = nookies.get()["userToken"]

  const getCarsByBrand = async (brand?: string) => {
    try {
      const response: AxiosResponse<ICar[] | Record<string, ICar[]>> = await carsApi.get(
        `/cars${brand && brand !== "outra" ? `?brand=${brand}` : ""}`
      )
      const data = response.data

      if (Array.isArray(data)) {
        setCars(data)
      } else {
        const carArray: ICar[] = []

        for (const brand in data) {
          if (Object.hasOwnProperty.call(data, brand)) {
            const carsArray = data[brand]
            carArray.push(...carsArray)
          }
        }

        setCars(carArray)
      }
    } catch (err: unknown) {
      console.log(err)
    }
  }

  const postAdvertisement = async (data: TAdvertisementReq) => {
    try {
      const response = await api.post<TAdvertisementRes>("/adverts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      setCreateAdvertModal(false)
      toast.success("Veículo publicado com sucesso!")
      return response
    } catch (err: unknown) {
      toast.error("Erro ao publICar veículo. Tente novamente mais tarde.")
      console.log(err)
    }
  }

  const deleteAdvert=async(id:string)=>{
    try{
      const response = await api.delete(`/adverts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Publicação removida com sucesso!")
      window.location.reload()
    }catch(err: unknown){
      console.log(err)
      toast.error("Algo deu errado ao deletar o anúncio. Tente novamente mais tarde")
    }
  }

  const editAdvert=async(id:string, data: TAdvertisementReqUpdate)=>{
    try{
      const token = nookies.get()["userToken"]
      const response = await api.patch(`/adverts/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Publicação editada com sucesso!")
      window.location.reload()
    }catch(err: unknown){
      console.log(err)
      toast.error("Algo deu errado ao editar o anúncio. Tente novamente mais tarde")
    }
  }

  return (
    <CarsContext.Provider value={{ getCarsByBrand, cars,
      postAdvertisement, deleteAdvert, editAdvert, currentAdvert, setCurrentAdvert }}>
      {children}
    </CarsContext.Provider>
  )
}

export const useCarsContext =() => useContext(CarsContext)
