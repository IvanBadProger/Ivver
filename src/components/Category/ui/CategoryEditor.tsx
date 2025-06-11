import { WithId } from "@/shared/types"
import { Ref } from "react"
import { CategoryDTO } from "../types"
import { Modal } from "@/shared/ui"
import dynamic from "next/dynamic"

const CategoryForm = dynamic(() => import("./CategoryForm"), {
  ssr: false,
})

type CategoryEditorProps = {
  closeModal: () => void
  ref: Ref<HTMLDialogElement> | undefined
  categoryData?: WithId<CategoryDTO>
}

export const CategoryEditor = (props: CategoryEditorProps) => {
  const { closeModal, ref, categoryData } = props

  return (
    <Modal
      ref={ref}
      onClose={closeModal}
      label="Редактирование категории"
    >
      <CategoryForm
        isEdit
        category={categoryData}
        onSubmitExtra={closeModal}
      />
    </Modal>
  )
}
