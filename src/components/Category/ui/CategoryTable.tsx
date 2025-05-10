"use client"
import { Modal, Table, useModal } from "@/shared/ui"
import { CategoryDTO, WithId } from "../types"
import { CategoryRow } from "./CategoryRow"
import { CategoryForm } from "./CategoryForm"
import { useState } from "react"

type CategoryTableProps = {
  categories: WithId<CategoryDTO>[]
}

export const CategoryTable = ({ categories }: CategoryTableProps) => {
  const { openModal, dialogRef } = useModal()
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

      <Modal ref={dialogRef} label="Редактирование категории">
        <CategoryForm isEdit category={selectedCategory} />
      </Modal>
    </>
  )
}
