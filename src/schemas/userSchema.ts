import {z} from 'zod'

const User=z.object({
    birthdate:z.string().or(z.date()),
    createdAt:z.string().or(z.date()),
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