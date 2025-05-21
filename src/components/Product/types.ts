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

export const MeasurementUnitDTOSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
})

export const ProductSchema = z.object({
  id: z.string().nonempty(),
  name: z
    .string()
    .trim()
    .nonempty("Это поле обязательно")
    .max(128, "Максимальное количество символов 128"),
  description: z.string().trim().optional(),
  category_id: z.string().nonempty("Это поле обязательно"),
  category: z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
  }),
  price: z.string().transform((val) => parseFloat(val).toFixed(2)),
  photos: z.array(photoSchema).optional(),
  measurement_unit_id: z.string().optional(),
  measurement_unit: MeasurementUnitDTOSchema.optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  specifications: z.array(specificationSchema).optional(),
})

export const ProductDTOSchema = ProductSchema.pick({
  name: true,
  price: true,
  category_id: true,
  category: true,
  measurement_unit_id: true,
  measurement_unit: true,
}).extend({ preview_photo_url: z.string().optional() })

export type ProductDTO = z.infer<typeof ProductDTOSchema> & {
  preview_photo_url?: string
}

export type ProductPhoto = z.infer<typeof photoSchema>

export type Specification = z.infer<typeof specificationSchema>

export type Product = z.infer<typeof ProductSchema>

export type MeasurementUnitDTO = z.infer<
  typeof MeasurementUnitDTOSchema
>
