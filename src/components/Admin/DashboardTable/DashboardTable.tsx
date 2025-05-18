import { CategoryDTO } from "@/components/Category"
import { ProductDTO } from "@/components/Product"
import { WithId } from "@/shared/types"
import { Modal, Table, useModal } from "@/shared/ui"
import { useState } from "react"

type DashboardTableItem = WithId<CategoryDTO | ProductDTO>

type DashboardTableProps = {
  tableHeadColumns: string[]
  items: DashboardTableItem[]
  RowElement: React.ElementType
  FormElement: React.ElementType
}

export const DashboardTable = (props: DashboardTableProps) => {
  const { tableHeadColumns, items, RowElement, FormElement } = props
  const [selectedItem, setSelectedItem] =
    useState<DashboardTableItem>()
  const { openModal, dialogRef, closeModal } = useModal()

  const onClick = (item: DashboardTableItem) => {
    setSelectedItem(item)
    openModal()
  }

  return (
    <>
      <Table className="w-full">
        <Table.Header columns={tableHeadColumns} />
        <Table.Body>
          {items.map((item) => (
            <RowElement key={item.id} data={item} onClick={onClick} />
          ))}
        </Table.Body>
      </Table>

      <Modal ref={dialogRef} onClose={closeModal}>
        <FormElement category={selectedItem} method="dialog" />
      </Modal>
    </>
  )
}
