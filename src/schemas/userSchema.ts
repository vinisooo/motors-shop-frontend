import {z} from 'zod'

const User=z.object({
    birthdate:z.date(),
    createdAt:z.string().datetime(),
    description: z.string().nullish(),
    email:z.string().email(),
    id:z.string(),
    isAdvertiser: z.boolean(),
    name: z.string(),
    phone: z.string(),
    profileImg: z.string().nullable(),
})

type TUser=z.infer<typeof User>

export {User}
export type {TUser}