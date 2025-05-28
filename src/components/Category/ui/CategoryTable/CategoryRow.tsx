"use client"
import { Table } from "@/shared/ui"
import { WithId } from "@/shared/types"
import { CategoryDTO } from "../../types"

type CategoryRowProps = {
  onClick: (category: WithId<CategoryDTO>) => void
  rowData: WithId<CategoryDTO>
}

export const CategoryRow = (props: CategoryRowProps) => {
  const { rowData, onClick } = props
  const { id, name, description } = rowData

  return (
    <Table.Row
      title={`Редактировать категорию ${name}`}
      key={name}
      onClick={() => onClick({ name, description, id })}
      className="cursor-pointer"
    >
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{description ?? "-"}</Table.Cell>
    </Table.Row>
  )
}
