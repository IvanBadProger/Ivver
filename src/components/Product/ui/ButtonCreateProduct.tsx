"use client"
import { Button } from "@/shared/ui"
import { ProductForm } from "./ProductForm"
import { Modal, useModal } from "@/shared/ui"

export const ButtonCreateProduct = () => {
  const { openModal, dialogRef } = useModal()

  return (
    <>
      <Button onClick={openModal}>Добавить товар</Button>

      <Modal isLabelHidden label="Создание товара" ref={dialogRef}>
        <ProductForm />
      </Modal>
    </>
  )
}
