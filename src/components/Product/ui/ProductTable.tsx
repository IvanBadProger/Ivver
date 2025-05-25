"use client"
import { ProductDTO } from "../types"
import { Modal, Table, useModal } from "@/shared/ui"
import { ProductRow } from "./ProductRow"
const ProductForm = dynamic(
  () => import("./ProductForm/ProductForm"),
  {
    ssr: false,
  }
)
import { useState } from "react"
import { WithId } from "@/shared/types"
import dynamic from "next/dynamic"

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
  console.log(products)

  const { dialogRef, openModal, closeModal } = useModal()
  const [selectedProductId, setSelectedProductId] = useState<string>()

  const onClick = (id: string) => {
    setSelectedProductId(id)
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

      <Modal
        onClose={closeModal}
        ref={dialogRef}
        label="Редактирование товара"
      >
        <ProductForm
          isEdit
          productId={selectedProductId}
          onSubmitExtra={closeModal}
        />
      </Modal>
    </>
  )
}
