import { object, z } from "zod"
import { galleryAdvertisementListSchema } from "./galleryAdvertisement.schema"

export const advertisementSchema = z.object({
    id: z.string(),
    brand: z.string().max(60, "Marca deve ter no máximo 60 caracteres"),
    model: z.string().max(120,  "Modelo deve ter no máximo 120 caracteres"),
    year: z.number(),
    fuel: z.string().max(20, "Combustível deve ter no máximo 20 caracteres"),
    color: z.string().max(20, "Cor deve conter no máximo 20 caracteres"),
    quilometers: z.number(),
    price: z.number(),
    coverImage: z.string().max(150, "Imagem deve conter no máximo 150 caracteres"),
    description: z.string(),
    isAvailable: z.boolean(),
    user: z.any(),
    createdAt: z.date(),
    fipeDeal: z.boolean().optional(),
    updatedAt: z.date().nullable(),
    galleryAdvertisement: galleryAdvertisementListSchema
})

export const advertisementReqSchema = advertisementSchema.omit({
    id: true,
    isAvailable: true,
    use: true,
    createdAt: true,
    updatedAt: true,
    galleryAdvertisement: true
}).extend({
    fipePrice: z.number(),
    galleryAdvertisement: z.array(z.string()).optional()
}).refine((data) => data.year >= 1900 || data.year === 0 && data.year <= new Date().getFullYear(), {
    message: "O ano deve ser válido.",
    path: ["year"],
})

export type TAdvertisementReq = z.infer<typeof advertisementReqSchema>
export type TAdvertisementRes = z.infer<typeof advertisementSchema>

export interface iPaginatedAdverts {
    prev?: string | null,
    page?: string | null,
    next?: string | null,
    maxPage?: string | null,
    count?: number,
    adverts: TAdvertisementRes[]
}
