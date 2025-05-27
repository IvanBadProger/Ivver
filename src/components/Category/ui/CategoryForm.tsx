"use client"
import { Input, TextArea, Form, Button } from "@/shared/ui"
import { CategoryDTO, CategoryDTOSchema } from "../types"
import { addCategory, updateCategory } from "../api"
import { WithId } from "@/shared/types"
import { forwardRef } from "react"
import { toast, ToastContainer } from "react-toastify"
import { createPortal } from "react-dom"

interface CategoryFormProps {
  isEdit?: boolean
  category?: WithId<CategoryDTO>
  onSubmitExtra?: () => void
}

const CategoryForm = forwardRef<HTMLFormElement, CategoryFormProps>(
  function CategoryForm(props, ref) {
    const { isEdit = false, category, onSubmitExtra } = props

    const heading = isEdit
      ? "Редактирование категории"
      : "Создание категории"

    const onSubmit = async (data: CategoryDTO) => {
      let res

      if (isEdit && category?.id) {
        res = (await updateCategory(category.id, data)).toString()
      } else {
        res = (await addCategory(data)).toString()
      }

      toast(res, {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
      })

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
          <Input label="Название" name="name" />
          <TextArea label="Описание" name="description" />
          <Button type="submit">
            {isEdit ? "Сохранить" : "Создать"}
          </Button>
        </Form>
        {createPortal(<ToastContainer limit={3} />, document.body)}
      </>
    )
  }
)

export default CategoryForm
