import { z } from "zod"

const requiredString = z
  .string()
  .trim()
  .nonempty("Это поле не может быть пустым")

export const AuthSchema = z.object({
  login: requiredString,
  password: requiredString,
})

export type AuthData = z.infer<typeof AuthSchema>
