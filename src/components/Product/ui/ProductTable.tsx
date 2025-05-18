"use client"
import { ProductDTO, ProductForm as TProductForm } from "../types"
import { Modal, Table, useModal } from "@/shared/ui"
import { ProductRow } from "./ProductRow"
import { ProductForm } from "./ProductForm"
import { useState } from "react"
import { WithId } from "@/shared/types"

const tableHeadCols: string[] = [
  "Название",
  "Категория",
  "Цена",
  "Единица измерения",
]

type ProductTableProps = {
  products: WithId<ProductDTO>[]
}

export const ProductTable = (props: ProductTableProps) => {
  const { products } = props

  const { dialogRef, openModal, closeModal } = useModal()
  const [selectedProduct, setSelectedProduct] =
    useState<WithId<ProductDTO>>()

  const onClick = (product: WithId<ProductDTO>) => {
    setSelectedProduct(product)
    openModal()
  }

  const parseToProductFormData = (
    product?: WithId<ProductDTO>
  ): WithId<TProductForm> | undefined => {
    if (!product) return undefined

    const { category_id, name, price, measurement_unit_id, id } =
      product

    return {
      id,
      category_id,
      name,
      price,
      specifications: [],
      description: "",
      measurement_unit_id,
    }
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

      <Modal
        onClose={closeModal}
        ref={dialogRef}
        label="Редактирование товара"
      >
        <ProductForm
          isEdit
          product={parseToProductFormData(selectedProduct)}
        />
      </Modal>
    </>
  )
}
