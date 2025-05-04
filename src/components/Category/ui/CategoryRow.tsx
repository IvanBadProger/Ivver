"use client"
import { Table } from "@/shared/ui"
import { CategoryDTO, WithId } from "../types"

type CategoryRowProps = WithId<CategoryDTO> & {
  onClick: (category: WithId<CategoryDTO>) => void
}

export const CategoryRow = (props: CategoryRowProps) => {
  const { name, description, onClick, id } = props

  return (
    <Table.Row
      title={`Редактировать категорию ${name}`}
      key={name}
      onClick={() => onClick({ name, description, id })}
      className="cursor-pointer"
    >
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
    </Table.Row>
  )
}
