import { object, z } from "zod"

export const advertisementSchema = z.object({
    id: z.string(),
    brand: z.string().max(60),
    model: z.string().max(120),
    year: z.number(),
    fuel: z.string().max(20),
    color: z.string().max(20),
    quilometers: z.number(),
    price: z.number(),
    coverImage: z.string().max(150),
    description: z.string(),
    isAvailable: z.boolean(),
    user: z.any(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    galleryAdvertisement: z.array(z.string()).optional()
})

export const advertisementReqSchema = advertisementSchema.omit({
    id: true,
    isAvailable: true,
    use: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    fipePrice: z.number()
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
