import { z } from "zod"

export const galleryAdvertisementSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
})

export const galleryAdvertisementListSchema = galleryAdvertisementSchema.array()