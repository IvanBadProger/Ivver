"use client"
import { Input, TextArea, Form, Button } from "@/shared/ui"
import { CategoryDTO, CategoryDTOSchema } from "../types"
import { addCategory, updateCategory } from "../api"
import { WithId } from "@/shared/types"
import { forwardRef, useState } from "react"
import { toast } from "react-toastify"
import { MAIN_TOAST_CONTAINER_ID } from "@/shared/constants"

interface CategoryFormProps {
  isEdit?: boolean
  category?: WithId<CategoryDTO>
  onSubmitExtra?: () => void
}

export default forwardRef<HTMLFormElement, CategoryFormProps>(
  function CategoryForm(props, ref) {
    const { isEdit = false, category, onSubmitExtra } = props
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit = async (data: CategoryDTO) => {
      setIsLoading(true)
      let responseMessage

      try {
        responseMessage =
          isEdit && category?.id
            ? await updateCategory(category.id, data)
            : await addCategory(data)
      } catch {
        responseMessage = "Произошла неизвестная ошибка"
      }

      setIsLoading(false)
      toast(responseMessage.toString(), {
        containerId: MAIN_TOAST_CONTAINER_ID,
      })

      onSubmitExtra?.()
    }

    return (
      <>
        <Form
          ref={ref}
          schema={CategoryDTOSchema}
          onSubmit={onSubmit}
          updatedValues={category}
        >
          <Input label="Название" name="name" />
          <TextArea label="Описание" name="description" />
          <Button type="submit" isLoading={isLoading}>
            {isEdit ? "Сохранить" : "Создать"}
          </Button>
        </Form>
      </>
    )
  }
)
