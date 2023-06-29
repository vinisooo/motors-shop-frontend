import { z } from "zod";
import { advertisementSchema } from "./advertisement.schema";

export const commentSchema = z.object({
    id: z.string(),
    comment: z.string(),
    createdAt: z.string(),
    user: z.object({id: z.string(), name: z.string(), profileImg: z.string().nullable()}),
    advertisement: z.object({id: z.string()})   
})

export const commentSchemaRes = z.object({ 
    post: advertisementSchema,
    postComments: z.array(commentSchema)
})

export type TCommentRes = z.infer<typeof commentSchemaRes>
export type TComments = z.infer<typeof commentSchema>