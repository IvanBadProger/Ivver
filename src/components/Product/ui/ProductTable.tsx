"use client"
import { Product } from "../types"
import { Modal, Table, useModal } from "@/shared/ui"
import { ProductRow } from "./ProductRow"
import { ProductForm } from "./ProductForm"
import { useState } from "react"

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
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  const onClick = (
    product: Omit<Product, "images" | "description">
  ) => {
    setSelectedProduct(product)
    openModal()
  }

  return (
    <>
      <Table className="w-full">
        <Table.Header columns={tableHeadCols} />
        <Table.Body>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              data={product}
              onClick={onClick}
            />
          ))}
        </Table.Body>
      </Table>

      <Modal ref={dialogRef} label="Редактирование товара">
        <ProductForm isEdit product={selectedProduct} />
      </Modal>
    </>
  )
}
