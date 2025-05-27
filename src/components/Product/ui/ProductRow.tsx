"use client"
import { Button, Table } from "@/shared/ui"
import { ProductDTO } from "../types"
import { WithId } from "@/shared/types"
import { removeProduct } from "../api"
import { X } from "lucide-react"

type ProductRowProps = {
  onClick: (id: string) => void
  data: WithId<ProductDTO>
}
// fix: тип data поменять
export const ProductRow = (props: ProductRowProps) => {
  const { data, onClick } = props
  const { category, name, price, id } = data

  return (
    <Table.Row
      className="cursor-pointer relative"
      title={`Редактировать товар: ${name}`}
      onClick={() => onClick(id)}
    >
      <Table.Cell className="max-w-[20vw]">{name}</Table.Cell>
      <Table.Cell className="max-w-[10vw]">
        {category.name}
      </Table.Cell>
      <Table.Cell>{price} руб</Table.Cell>
      <Table.Cell>
        <Button
          label="Удалить товар"
          mode="danger"
          size="sm"
          className="absolute top-2 z-10"
          // fix: добавить всплывашку с подтверждением
          onClick={(event) => {
            event.stopPropagation()
            removeProduct(id)
          }}
        >
          <X />
        </Button>
      </Table.Cell>
    </Table.Row>
  )
}
