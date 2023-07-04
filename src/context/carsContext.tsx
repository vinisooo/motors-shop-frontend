"use client"
import { createContext, useContext } from "react"
import { useState } from "react"
import { AxiosResponse } from "axios"
import nookies from "nookies"
import { TAdvertisementReq, TAdvertisementReqUpdate, TAdvertisementRes } from "@/schemas/advertisement.schema"
import api, { carsApi } from "@/services"
import { useModalContext } from "./modalContext"
import {toast} from "react-toastify"
import { useRouter } from "next/navigation"

interface iChildrenProps {
  children: React.ReactNode
}

interface iModalContextValues {
  getCarsByBrand: (brand?: string) => Promise<void>
  cars: iCar[]
  deleteAdvert: (id: string) => Promise<void>
  postAdvertisement: (data: TAdvertisementReq) => Promise<AxiosResponse<TAdvertisementRes, any> | undefined>
  editAdvert: (id: string, data: TAdvertisementReqUpdate) => Promise<void>
}

export const CarsContext = createContext({} as iModalContextValues)

export interface iCar {
  name: string
  value?: number
  year?: number
}

export const CarsProvider = ({ children }: iChildrenProps) => {
  const [cars, setCars] = useState<iCar[]>([])
  const {setCreateAdvertModal} = useModalContext()

  const token = nookies.get()["userToken"]
  const router = useRouter()

  const getCarsByBrand = async (brand?: string) => {
    try {
      const response: AxiosResponse<iCar[] | Record<string, iCar[]>> = await carsApi.get(
        `/cars${brand && brand !== "outra" ? `?brand=${brand}` : ""}`
      )
      const data = response.data

      if (Array.isArray(data)) {
        setCars(data)
      } else {
        const carArray: iCar[] = []

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
          Authorization: `Bearer ${token}`,
        },
      })
      setCreateAdvertModal(false)
      toast.success("Veículo publicado com sucesso!")
      return response
    } catch (err: unknown) {
      toast.error("Erro ao publicar veículo. Tente novamente mais tarde.")
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
      router.push("/user")
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
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Publicação editada com sucesso!")
      router.push("/user")
    }catch(err: unknown){
      console.log(err)
      toast.error("Algo deu errado ao deletar o anúncio. Tente novamente mais tarde")
    }
  }

  return (
    <CarsContext.Provider value={{ getCarsByBrand, cars,
      postAdvertisement, deleteAdvert, editAdvert }}>
      {children}
    </CarsContext.Provider>
  )
}

export const useCarsContext =() => useContext(CarsContext)
