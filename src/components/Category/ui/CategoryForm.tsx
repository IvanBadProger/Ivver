"use client"
import { Input, TextArea, Form, Button } from "@/shared/ui"
import { CategoryDTO, CategoryDTOSchema } from "../types"
import { addCategory, updateCategory } from "../api"
import { WithId } from "@/shared/types"
import { forwardRef } from "react"

interface CategoryFormProps {
  isEdit?: boolean
  category?: WithId<CategoryDTO>
  onSubmitExtra?: () => void
}

export const CategoryForm = forwardRef<
  HTMLFormElement,
  CategoryFormProps
>(function CategoryForm(props, ref) {
  const { isEdit = false, category, onSubmitExtra } = props

  const heading = isEdit
    ? "Редактирование категории"
    : "Создание категории"

  const onSubmit = async (data: CategoryDTO) => {
    if (isEdit && category?.id) {
      alert(await updateCategory(category.id, data))
    } else {
      alert(await addCategory(data))
    }

    if (onSubmitExtra) onSubmitExtra()
  }

  return (
    <>
      <Form
        ref={ref}
        heading={heading}
        schema={CategoryDTOSchema}
        onSubmit={onSubmit}
        updatedValues={category}
      >
        {/* fix: если указать неправльный name не сработает */}
        <Input label="Название" name="name" />
        <TextArea label="Описание" name="description" />
        <Button type="submit">
          {isEdit ? "Редактировать" : "Создать"}
        </Button>
      </Form>
    </>
  )
})
