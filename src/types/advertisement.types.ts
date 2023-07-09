import { z } from "zod"
import { Car, Cars, advertisementReqSchema, advertisementReqUpdateSchema, advertisementSchema } from "@/schemas/advertisement.schema"

export interface TPaginatedAdverts {
    prev?: string | null,
    page?: string | null,
    next?: string | null,
    maxPage?: string | null,
    count?: number,
    adverts: TAdvertisementRes[]
}

export type TCar=z.infer<typeof Car>
export type TCars=z.infer<typeof Cars>

export type TAdvertisementReqUpdate = z.infer<typeof advertisementReqUpdateSchema>
export type TAdvertisementReq = z.infer<typeof advertisementReqSchema>
export type TAdvertisementRes = z.infer<typeof advertisementSchema>
