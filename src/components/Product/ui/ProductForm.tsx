"use client"
import { CategorySelect } from "@/components/Category"
import { addProduct, updateProduct } from "../api"
import { ProductDTO, ProductDTOSchema } from "../types"
import { Input, TextArea, Form, Button } from "@/shared/ui"
import { WithId } from "@/components/Category/types"

interface ProductFormProps {
  isEdit?: boolean
  product?: WithId<ProductDTO>
}

export const ProductForm = (props: ProductFormProps) => {
  const { isEdit, product } = props

  const heading = isEdit
    ? "Редактирование продукта"
    : "Создание продукта"

  const onSubmit = async (data: ProductDTO) => {
    let res

    if (isEdit && product?.id) {
      res = await updateProduct(product.id, data)
    } else {
      res = await addProduct(data)
    }
    console.log(res)
  }

  return (
    <Form
      heading={heading}
      onSubmit={onSubmit}
      schema={ProductDTOSchema}
      defaultValues={product}
    >
      <Input name="name" label="Название" />
      <TextArea label="Описание" name="description" />
      <CategorySelect name="category_id" />
      <Input name="price" label="Цена" />
      {/* <Input name="measurement_unit_id" label="Единица измерения" /> */}
      {/* <FileInput /> */}
      <Button type="submit">
        {isEdit ? "Редактировать" : "Создать"}
      </Button>
    </Form>
  )
}
