"use client"
import { Modal, Table, useModal } from "@/shared/ui"
import { CategoryDTO } from "../types"
import { CategoryRow } from "./CategoryRow"
const CategoryForm = dynamic(() => import("./CategoryForm"), {
  ssr: false,
})
import { useState } from "react"
import { WithId } from "@/shared/types"
import dynamic from "next/dynamic"

type CategoryTableProps = {
  categories: WithId<CategoryDTO>[]
}

export const CategoryTable = ({ categories }: CategoryTableProps) => {
  const { openModal, dialogRef, closeModal } = useModal()
  const [selectedCategory, setSelectedCategory] =
    useState<WithId<CategoryDTO>>()

  const onClick = (category: WithId<CategoryDTO>) => {
    setSelectedCategory(category)
    openModal()
  }

  return (
    <>
      <Table className="w-full">
        <Table.Header columns={["Название", "Описание"]} />
        <Table.Body>
          {categories.map((category) => (
            <CategoryRow
              onClick={onClick}
              key={category.id}
              data={category}
            />
          ))}
        </Table.Body>
      </Table>

      <Modal
        ref={dialogRef}
        onClose={closeModal}
        label="Редактирование категории"
      >
        <CategoryForm
          isEdit
          category={selectedCategory}
          onSubmitExtra={closeModal}
        />
      </Modal>
    </>
  )
}
