"use client"
import { Input, TextArea, Form, Button } from "@/shared/ui"
import { CategoryDTO, CategoryFormSchema, WithId } from "../types"
import { addCategory, updateCategory } from "../api"

interface CategoryFormProps {
  isEdit?: boolean
  category?: WithId<CategoryDTO>
}
// fix: про cache почитать
export const CategoryForm = (props: CategoryFormProps) => {
  const { isEdit = false, category } = props

  // fix: при isEdit прокинем defaultValues
  const heading = isEdit
    ? "Редактирование категории"
    : "Создание категории"

  const onSubmit = async (data: CategoryDTO) => {
    if (isEdit && category?.id) {
      console.log(await updateCategory(category?.id, data))
    } else {
      console.log(await addCategory(data))
    }
  }

  return (
    <>
      <Form
        heading={heading}
        schema={CategoryFormSchema}
        onSubmit={onSubmit}
        defaultValues={category}
      >
        {/* fix: если указать неправльный name не сработает */}
        <Input label="Название" name="name" />
        <TextArea label="Описание" name="description" />
        <Button type="submit">Создать</Button>
      </Form>
    </>
  )
}
