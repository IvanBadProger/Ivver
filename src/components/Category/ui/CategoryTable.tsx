"use client"
import { Modal, Table, useModal } from "@/shared/ui"
import { CategoryDTO } from "../types"
import { CategoryRow } from "./CategoryRow"
import { CategoryForm } from "./CategoryForm"

type CategoryTableProps = {
  categories: CategoryDTO[]
  className?: string
}

export const CategoryTable = ({
  categories,
  className,
}: CategoryTableProps) => {
  const { openModal, dialogRef } = useModal()

  return (
    <>
      <table className={className}>
        <Table.Header columns={["Название", "Описание"]} />
        <Table.Body>
          {categories.map((category, index) => (
            <CategoryRow
              openEditModal={openModal}
              key={index}
              {...category}
            />
          ))}
        </Table.Body>
      </table>
      <Modal ref={dialogRef} label="Редактирование категории">
        <CategoryForm isEdit />
      </Modal>
    </>
  )
}
