"use client"
import { CategoryDTO, CategoryFormSchema } from "../types"
import { Input, TextArea, Form } from "@/shared/ui"

interface CategoryFormProps {
  isEdit?: boolean
}
export const CategoryForm = (props: CategoryFormProps) => {
  const { isEdit = false } = props

  // fix: при isEdit прокинем defaultValues
  const heading = isEdit
    ? "Редактирование категории"
    : "Создание категории"

  const onSubmit = (data: CategoryDTO) => {
    console.log(data)
  }

  return (
    <>
      <Form
        heading={heading}
        schema={CategoryFormSchema}
        onSubmit={onSubmit}
      >
        <Input label="Название" name="title" />
        <TextArea label="Описание" name="description" />
      </Form>
    </>
  )
}
