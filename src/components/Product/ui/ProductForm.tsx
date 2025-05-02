"use client"
import { ProductDTO, ProductDTOSchema } from "../types"
import { Input, TextArea, Form, FileInput } from "@/shared/ui"

interface ProductFormProps {
  isEdit?: boolean
}

export const ProductForm = (props: ProductFormProps) => {
  const { isEdit } = props
  const heading = isEdit
    ? "Редактирование продукта"
    : "Создание продукта"

  const onSubmit = (data: ProductDTO) => {
    console.log(data)
  }

  return (
    <Form
      heading={heading}
      onSubmit={onSubmit}
      schema={ProductDTOSchema}
    >
      <Input name="name" label="Название" />
      <TextArea label="Описание" />
      {/* fix: текущий компонент клиентский - значит все дочерние тоже. А селект категорий - делает запрос к апи. Как решить? */}
      {/* <CategorySelect /> */}
      <Input name="price" label="Цена" type="number" step={100} />
      <Input name="unit" label="Единица измерения" />
      <FileInput />
    </Form>
  )
}
