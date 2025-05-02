import { z } from "zod"

export const CategorySchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export type Category = z.infer<typeof CategorySchema>

export const CategoryFormSchema = CategorySchema.pick({
  name: true,
  description: true,
})

export type CategoryDTO = z.infer<typeof CategoryFormSchema>
