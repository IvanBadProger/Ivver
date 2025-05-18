"use client"
import { Table } from "@/shared/ui"
import { CategoryDTO } from "../types"
import { WithId } from "@/shared/types"

type CategoryRowProps = {
  onClick: (category: WithId<CategoryDTO>) => void
  data: WithId<CategoryDTO>
}

export const CategoryRow = (props: CategoryRowProps) => {
  const { data, onClick } = props
  const { id, name, description } = data

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
