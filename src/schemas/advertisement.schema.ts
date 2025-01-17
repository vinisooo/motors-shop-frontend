import { z } from "zod"
import { galleryAdvertisementListSchema } from "./galleryAdvertisement.schema"

const FileOrFileList = z.custom((value) => {
    return value instanceof File || value instanceof FileList;
}, { message: "Expected File or FileList" })
  

export const advertisementSchema = z.object({
    id: z.string(),
    brand: z.string().max(60, "Marca deve ter no máximo 60 caracteres"),
    model: z.string().max(120,  "Modelo deve ter no máximo 120 caracteres"),
    year: z.number(),
    fuel: z.string().max(20, "Combustível deve ter no máximo 20 caracteres"),
    color: z.string().max(20, "Cor deve conter no máximo 20 caracteres"),
    quilometers: z.number().or(z.string()),
    price: z.number().or(z.string()),
    coverImage: FileOrFileList.or(z.string()),
    description: z.string(),
    isAvailable: z.boolean(),
    user: z.any(),
    createdAt: z.date().or(z.string()),
    fipeDeal: z.boolean().optional(),
    updatedAt: z.date().nullable().or(z.string()),
    galleryAdvertisement: galleryAdvertisementListSchema,
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

export const advertisementReqUpdateSchema = advertisementSchema.omit({
    id: true,
    isAvailable: true,
    use: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    fipePrice: z.number().optional()
}).partial()


export const Car=advertisementSchema.omit({
    user:true,
    coverImage: true
}).extend({
    coverImage: z.string(),
    galleryAdvertisement: galleryAdvertisementListSchema.optional()
})

export const Cars=z.array(Car)
