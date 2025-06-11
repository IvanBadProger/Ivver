"use client"
import { Table, useModal } from "@/shared/ui"
import { CategoryDTO } from "../../types"
import { CategoryRow } from "./CategoryRow"
import { useState } from "react"
import { WithId } from "@/shared/types"
import { HEADER_COLS } from "./constants"
import { CategoryEditor } from "../CategoryEditor"

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
        <Table.Header columns={HEADER_COLS} />
        <Table.Body>
          {categories.map((category) => (
            <CategoryRow
              onClick={onClick}
              key={category.id}
              rowData={category}
            />
          ))}
        </Table.Body>
      </Table>

      <CategoryEditor
        ref={dialogRef}
        categoryData={selectedCategory}
        closeModal={closeModal}
      />
    </>
  )
}
