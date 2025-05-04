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
  const [categoryState, setCategoryState] =
    useState<WithId<CategoryDTO>>()

  return (
    <>
      <Table className="w-full">
        <Table.Header columns={["Название", "Описание"]} />
        <Table.Body>
          {categories.map((category, index) => (
            <CategoryRow
              onClick={(category) => {
                setCategoryState(category)
                openModal()
              }}
              key={index}
              {...category}
            />
          ))}
        </Table.Body>
      </Table>
      <Modal ref={dialogRef} label="Редактирование категории">
        <CategoryForm isEdit category={categoryState} />
      </Modal>
    </>
  )
}
