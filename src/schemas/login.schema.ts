import { z } from "zod";

export const loginReqSchema = z.object({
  email: z.string().email(),
  password: z.string()
})