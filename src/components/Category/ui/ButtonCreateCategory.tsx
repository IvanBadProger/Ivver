"use client"
import { Button, Modal, useModal } from "@/shared/ui"
import { CategoryForm } from "./CategoryForm"

export const ButtonCreateCategory = () => {
  const { openModal, dialogRef } = useModal()

  return (
    <>
      <Button onClick={openModal}>Добавить категорию</Button>
      <Modal isLabelHidden label="Создание категории" ref={dialogRef}>
        <CategoryForm />
      </Modal>
    </>
  )
}
