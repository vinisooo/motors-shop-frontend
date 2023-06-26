"use client"
import { carsApi } from "@/services"
import { AxiosResponse } from "axios"
import { createContext } from "react"
import { useState } from "react"

import { SetStateAction } from "react"

interface iChildrenProps{
    children: React.ReactNode
}

interface iModalContextValues{
    getCarsByBrand: (brand?: string) => Promise<void>
    cars: iCar[]
}


export const CarsContext = createContext({} as iModalContextValues)

export interface iCar {
    name: string
    value?: number
    year?:number
}

const CarsProvider = ({children}: iChildrenProps) => {
    
    const [cars, setCars]= useState<iCar[]>([])

    const getCarsByBrand = async (brand?: string) => {
        try {
          const response: AxiosResponse<iCar[] | Record<string, iCar[]>> = await carsApi.get(`/cars${brand && brand !=="outra" ? `?brand=${brand}` : ""}`);
          const data = response.data;
    
          if (Array.isArray(data)) {
            setCars(data);
          } else {
            const carArray: iCar[] = [];
    
            for (const brand in data) {
              if (Object.hasOwnProperty.call(data, brand)) {
                const carsArray = data[brand];
                carArray.push(...carsArray);
              }
            }
    
            setCars(carArray);
          }
        } catch (err: unknown) {
          console.log(err);
        }
      };
    return(
        <CarsContext.Provider value={{getCarsByBrand, cars}}>
            {children}
        </CarsContext.Provider>
    )
}

export default CarsProvider