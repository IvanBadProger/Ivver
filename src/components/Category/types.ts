import { z } from "zod"

export const CategorySchema = z.object({
  id: z.string().nonempty(),
  name: z
    .string()
    .nonempty("Название обязательно")
    .max(64, "Превышено максимальное количество символов (64)"),
  description: z.union([z.string(), z.null()]).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export type Category = z.infer<typeof CategorySchema>

export const CategoryDTOSchema = CategorySchema.pick({
  name: true,
  description: true,
})

export type CategoryDTO = z.infer<typeof CategoryDTOSchema>
