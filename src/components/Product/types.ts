import { z } from "zod"

export const specificationSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  value: z.string().nonempty(),
  product_id: z.string().nonempty(),
})

export type Specification = z.infer<typeof specificationSchema>

export const ProductSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().trim().nonempty("Это поле обязательно"),
  description: z.string().trim().optional(),
  category_id: z.string().nonempty(),
  category: z
    .object({
      id: z.string().nonempty(),
      name: z.string().nonempty(),
    })
    .optional(),
  price: z.string(),
  images: z.array(z.string()).optional(),
  measurement_unit_id: z.string().optional(),
  measurement_unit: z
    .object({
      id: z.string().nonempty(),
      name: z.string().nonempty(),
    })
    .optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  specifications: z.array(specificationSchema).optional(),
})

export type Product = z.infer<typeof ProductSchema>

export const ProductDTOSchema = ProductSchema.pick({
  name: true,
  description: true,
  category_id: true,
  measurement_unit_id: true,
  // specifications: true,
  price: true,
})

export type ProductDTO = z.infer<typeof ProductDTOSchema>
