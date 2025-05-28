"use client"
import { Button } from "@/shared/ui"
import dynamic from "next/dynamic"
import { Modal, useModal } from "@/shared/ui"
import { useRef } from "react"

const ProductForm = dynamic(
  () => import("./ProductForm/ProductForm"),
  {
    ssr: false,
  }
)

export const ButtonCreateProduct = () => {
  const { openModal, dialogRef, closeModal } = useModal()
  const formRef = useRef<HTMLFormElement>(null)

  const onClose = () => {
    resetCategoryForm()
    closeModal()
  }

  const resetCategoryForm = () => {
    const formElement = formRef.current

    if (formElement && formElement instanceof HTMLFormElement) {
      formElement.reset()
    }
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
        <ProductForm ref={formRef} onSubmitExtra={closeModal} />
      </Modal>
    </>
  )
}
