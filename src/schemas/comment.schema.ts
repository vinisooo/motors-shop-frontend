import { string, z } from "zod";
import { advertisementSchema } from "./advertisement.schema";

export const commentSchema = z.object({
    id: z.string(),
    comment: z.string(),
    createdAt: z.string(),
    user: z.object({id: z.string(), name: z.string(), profileImg: z.string().nullable()}),
    advertisement: z.object({id: z.string()}),
    timeSince: z.string()
})

export const commentsSchemaRes = z.object({ 
    post: advertisementSchema,
    postComments: z.array(commentSchema)
})

export const commentReqSchema=z.object({
    postId:z.string(),
    comment:z.string()
})

export type TCommentRes = z.infer<typeof commentsSchemaRes>
export type TComments = z.infer<typeof commentSchema>
export type TCommentReqSchema=z.infer<typeof commentReqSchema>