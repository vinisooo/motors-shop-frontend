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
    galleryAdvertisement: z.array(z.string())
})

export type TAdvertisementRes = z.infer<typeof advertisementSchema>
