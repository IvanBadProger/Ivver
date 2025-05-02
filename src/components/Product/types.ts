import { z } from "zod"

export const ProductSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().trim().nonempty("Это поле обязательно"),
  description: z.string().trim().nonempty(),
  category: z.string().nonempty(),
  price: z.number().nonnegative(),
  images: z.array(z.string()),
  unit: z.string().nonempty(),
})

export type Product = z.infer<typeof ProductSchema>

export const ProductDTOSchema = ProductSchema.omit({ id: true })

export type ProductDTO = z.infer<typeof ProductDTOSchema>
