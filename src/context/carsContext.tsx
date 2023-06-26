'use client'
import { createContext } from "react";
import { useState } from "react";
import { AxiosResponse } from "axios";
import nookies from "nookies";
import { TAdvertisementReq, TAdvertisementRes } from "@/schemas/advertisement.schema";
import api, { carsApi } from "@/services";

interface iChildrenProps {
  children: React.ReactNode;
}

interface iModalContextValues {
  getCarsByBrand: (brand?: string) => Promise<void>;
  cars: iCar[];
  postAdvertisement: (data: TAdvertisementReq) => Promise<AxiosResponse<TAdvertisementRes, any> | undefined>;
}

export const CarsContext = createContext({} as iModalContextValues);

export interface iCar {
  name: string;
  value?: number;
  year?: number;
}

const CarsProvider = ({ children }: iChildrenProps) => {
  const [cars, setCars] = useState<iCar[]>([]);

  const token = nookies.get()["userToken"];

  const getCarsByBrand = async (brand?: string) => {
    try {
      const response: AxiosResponse<iCar[] | Record<string, iCar[]>> = await carsApi.get(
        `/cars${brand && brand !== "outra" ? `?brand=${brand}` : ""}`
      );
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

  const postAdvertisement = async (data: TAdvertisementReq) => {
    try {
      const request = await api.post<TAdvertisementRes>("/adverts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(request);
      return request;
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <CarsContext.Provider value={{ getCarsByBrand, cars, postAdvertisement }}>
      {children}
    </CarsContext.Provider>
  );
};

export default CarsProvider;
