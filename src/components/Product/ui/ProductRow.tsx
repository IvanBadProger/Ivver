"use client"
import { Table } from "@/shared/ui"
import { Product } from "../types"

type ProductRowProps = {
  product: Omit<Product, "images" | "description">
  openEditModal: () => void
}

export const ProductRow = (props: ProductRowProps) => {
  const {
    product: { category, id, name, price, unit },
    openEditModal,
  } = props

  const onClick = (id: string) => {
    console.log("click " + id)
    openEditModal()
  }

  return (
    <Table.Row
      className="cursor-pointer"
      title={`Редактировать товар: ${name}`}
      onClick={() => onClick(id)}
    >
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{category}</Table.Cell>
      <Table.Cell>{price} руб</Table.Cell>
      <Table.Cell>{unit}</Table.Cell>
    </Table.Row>
  )
}
