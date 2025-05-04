"use client"
import { CategorySelect } from "@/components/Category"
import { addProduct } from "../api"
import { ProductDTO, ProductDTOSchema } from "../types"
import { Input, TextArea, Form, Button } from "@/shared/ui"

interface ProductFormProps {
  isEdit?: boolean
}

export const ProductForm = (props: ProductFormProps) => {
  const { isEdit } = props
  const heading = isEdit
    ? "Редактирование продукта"
    : "Создание продукта"

  const onSubmit = async (data: ProductDTO) => {
    console.log(data)
    const res = await addProduct(data)

    console.log(res)
  }

  return (
    <Form
      heading={heading}
      onSubmit={onSubmit}
      schema={ProductDTOSchema}
    >
      <Input name="name" label="Название" />
      <TextArea label="Описание" name="description" />
      <CategorySelect name="category_id" />
      <Input name="price" label="Цена" />
      {/* <Input name="measurement_unit_id" label="Единица измерения" /> */}
      {/* <FileInput /> */}
      <Button type="submit">Добавить</Button>
    </Form>
  )
}
