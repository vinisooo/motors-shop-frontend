import { z } from "zod"
import { commentReqSchema, commentSchema, commentsSchemaRes } from "@/schemas/comment.schema"

export type TCommentRes = z.infer<typeof commentsSchemaRes>
export type TComments = z.infer<typeof commentSchema>
export type TCommentReqSchema=z.infer<typeof commentReqSchema>