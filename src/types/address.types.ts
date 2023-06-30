import { addressReqSchema, addressReqUpdateSchema } from "@/schemas/address.schema"
import { z } from "zod"

export type TAddressReq = z.infer<typeof addressReqSchema>

export type TAddressUpdateReq = z.infer<typeof addressReqUpdateSchema>