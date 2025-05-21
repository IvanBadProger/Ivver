"use client"
import { Button, Modal, useModal } from "@/shared/ui"
import { CategoryForm } from "./CategoryForm"
import { useRef } from "react"

export const ButtonCreateCategory = () => {
  const { openModal, dialogRef, closeModal } = useModal()
  const formRef = useRef<HTMLFormElement>(null)

  const onClose = () => {
    formRef.current?.reset()
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal}>Добавить категорию</Button>
      <Modal
        isLabelHidden
        label="Создание категории"
        onClose={onClose}
        ref={dialogRef}
      >
        <CategoryForm ref={formRef} onSubmitExtra={closeModal} />
      </Modal>
    </>
  )
}
