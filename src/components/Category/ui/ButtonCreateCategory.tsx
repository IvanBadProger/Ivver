"use client"
import { Button, Modal, useModal } from "@/shared/ui"
import dynamic from "next/dynamic"
const CategoryForm = dynamic(() => import("./CategoryForm"), {
  ssr: false,
})
import { useRef } from "react"

export const ButtonCreateCategory = () => {
  const { openModal, dialogRef, closeModal } = useModal()
  const formRef = useRef<HTMLFormElement>(null)

  const resetCategoryForm = () => {
    const formElement = formRef.current

    if (formElement && formElement instanceof HTMLFormElement) {
      formElement.reset()
    }
  }

  const onModalClose = () => {
    resetCategoryForm()
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal}>Добавить категорию</Button>
      <Modal
        label="Создание категории"
        onClose={onModalClose}
        ref={dialogRef}
      >
        <CategoryForm ref={formRef} onSubmitExtra={closeModal} />
      </Modal>
    </>
  )
}
