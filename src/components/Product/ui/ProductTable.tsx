"use client"
import { Product } from "../types"
import { Modal, Table, useModal } from "@/shared/ui"
import { ProductRow } from "./ProductRow"
import { ProductForm } from "./ProductForm"

const tableHeadCols: string[] = [
  "Название",
  "Категория",
  "Цена",
  "Единица измерения",
]

type ProductTableProps = {
  products: Omit<Product, "images" | "description">[]
}

export const ProductTable = (props: ProductTableProps) => {
  const { products } = props

  const { dialogRef, openModal } = useModal()

  return (
    <>
      <Table className="w-full">
        <Table.Header columns={tableHeadCols} />
        <Table.Body>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              openEditModal={openModal}
            />
          ))}
        </Table.Body>
      </Table>

      <Modal ref={dialogRef} label="Редактирование товара">
        <ProductForm isEdit />
      </Modal>
    </>
  )
}
