"use client"
import { Table } from "@/shared/ui"
import { ProductDTO } from "../types"
import { WithId } from "@/shared/types"

type ProductRowProps = {
  onClick: (id: string) => void
  data: WithId<ProductDTO>
}
// fix: тип data поменять
export const ProductRow = (props: ProductRowProps) => {
  const { data, onClick } = props
  const { category, name, price, measurement_unit: unit, id } = data

  return (
    <Table.Row
      className="cursor-pointer"
      title={`Редактировать товар: ${name}`}
      onClick={() => onClick(id)}
    >
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{category.name}</Table.Cell>
      <Table.Cell>{price} руб</Table.Cell>
      <Table.Cell>{unit?.name}</Table.Cell>
    </Table.Row>
  )
}
