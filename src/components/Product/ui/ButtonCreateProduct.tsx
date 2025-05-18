"use client"
import { Button } from "@/shared/ui"
import { ProductForm } from "./ProductForm"
import { Modal, useModal } from "@/shared/ui"
import { useRef } from "react"

export const ButtonCreateProduct = () => {
  const { openModal, dialogRef, closeModal } = useModal()
  const formRef = useRef<HTMLFormElement>(null)

  const onClose = () => {
    formRef?.current?.reset()
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal}>Добавить товар</Button>

      <Modal
        onClose={onClose}
        isLabelHidden
        label="Создание товара"
        ref={dialogRef}
      >
        <ProductForm ref={formRef} />
      </Modal>
    </>
  )
}
