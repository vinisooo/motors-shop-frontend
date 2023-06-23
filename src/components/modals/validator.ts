import {z} from "zod" 

export const CreateAnnouncementSchema = z.object({
    brand: z.string(),
    model: z.string(),    
    year: z.number(),    
    fuel: z.string(),    
    color: z.string(),    
    quilometers: z.number(),    
    price: z.number(),
    fipePrice: z.number(),
    coverImage: z.string(),   
    description: z.string().optional()
})

export type CreateAnnouncementData = z.infer<typeof CreateAnnouncementSchema>