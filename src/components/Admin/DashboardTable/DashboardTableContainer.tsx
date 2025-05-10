"use client"

import { Modal, useModal } from "@/shared/ui"
import { useState } from "react"
import { DashboardTable } from "./DashboardTable"
import { CategoryForm } from "@/components/Category"
import { ProductForm } from "@/components/Product/ui/ProductForm"

type DashboardTableContainerProps = {}

export const DashboardTableContainer = (
  props: DashboardTableContainerProps
) => {
  const {} = props

  const { openModal, dialogRef } = useModal()
  const [itemClicked, setItemClicked] = useState()

  return (
    <>
      <DashboardTable RowComponent={} items={} onItemClick={} />

      <Modal ref={dialogRef} label="Редактирование категории">
        <CategoryForm isEdit category={itemClicked} />
        <ProductForm isEdit={itemClicked} />
      </Modal>
    </>
  )
}
