"use client"
import { Table } from "@/shared/ui"
import { CategoryDTO } from "../types"

type CategoryRowProps = CategoryDTO & { openEditModal: () => void }

export const CategoryRow = (props: CategoryRowProps) => {
  const { name, description, openEditModal } = props

  const onClick = (id: string) => {
    openEditModal()
    console.log(id)
  }

  return (
    <Table.Row
      title={`Редактировать категорию ${name}`}
      key={name}
      onClick={() => onClick(name)}
      className="cursor-pointer"
    >
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
    </Table.Row>
  )
}
