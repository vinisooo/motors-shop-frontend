import {z} from "zod"
import { User } from "./userSchema"
import { galleryAdvertisementListSchema } from "./galleryAdvertisement.schema"

const AdvertSchema=z.object({
    brand: z.string(),
    color: z.string(),
    coverImage: z.string(),
    createdAt: z.string().datetime(),
    description: z.string(),
    fuel: z.string(),
    id:z.string(),
    isAvailable: z.boolean(),
    model: z.string(),
    price: z.string(),
    fipeDeal: z.boolean().optional(),
    quilometers: z.string(),
    year: z.number(),
    user:User
})

const Adverts=z.array(AdvertSchema)

const Car=AdvertSchema.omit({
    user:true
}).extend({
    galleryAdvertisement: galleryAdvertisementListSchema.optional()
})

const Cars=z.array(Car)

type TAdvert=z.infer<typeof AdvertSchema>
type TAdverts=z.infer<typeof Adverts>
type TCar=z.infer<typeof Car>
type TCars=z.infer<typeof Cars>

export {AdvertSchema,Adverts,Car}
export type {TAdvert,TAdverts,TCar,TCars}