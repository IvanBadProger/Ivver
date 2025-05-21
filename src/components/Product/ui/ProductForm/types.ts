import { z } from "zod"
import { ProductSchema } from "../../types"

export const ProductFormUpdateSchema = ProductSchema.pick({
  category_id: true,
  price: true,
  specifications: true,
  description: true,
  measurement_unit_id: true,
  name: true,
})

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

export const ProductFormAddSchema = ProductFormSchema.extend({
  photos: z.instanceof(FileList).optional(),
  preview: z.instanceof(FileList).optional(),
})

export type ProductFormUpdate = z.infer<
  typeof ProductFormUpdateSchema
>
export type ProductFormAdd = z.infer<typeof ProductFormAddSchema>

export interface ProductFormProps {
  isEdit?: Readonly<boolean>
  productId?: Readonly<string>
}
