import { z } from "zod"

export const specificationSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  value: z.string().nonempty(),
  product_id: z.string().nonempty(),
})

export const photoSchema = z.object({
  id: z.string(),
  product_id: z.string(),
  is_preview: z.boolean(),
  path: z.string(),
  url: z.string(),
})

export type Specification = z.infer<typeof specificationSchema>

export const ProductSchema = z.object({
  id: z.string().nonempty(),
  name: z
    .string()
    .trim()
    .nonempty("Это поле обязательно")
    .max(128, "Максимальное количество символов 128"),
  description: z.string().trim().optional(),
  category_id: z.string().nonempty(),
  category: z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
  }),
  price: z.string().transform((val) => parseFloat(val).toFixed(2)),
  photos: z.array(photoSchema).optional(),
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
  price: true,
  category_id: true,
  category: true,
  measurement_unit_id: true,
  measurement_unit: true,
}).extend({ preview_photo_url: z.string().optional() })

export const ProductFormSchema = ProductSchema.pick({
  name: true,
  description: true,
  category_id: true,
  price: true,
  measurement_unit_id: true,
}).extend({
  specifications: z.array(
    z.object({ name: z.string(), value: z.string() })
  ),
})

export type ProductForm = z.infer<typeof ProductFormSchema>

export type ProductDTO = z.infer<typeof ProductDTOSchema> & {
  preview_photo_url?: string
}
