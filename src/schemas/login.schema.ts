import { z } from "zod";

export const loginReqSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string()
})