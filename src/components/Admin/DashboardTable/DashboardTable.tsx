import { Table } from "@/shared/ui"
import React from "react"

type DashboardItem = { id: string } & {}

type DashboardTableProps = {
  items: DashboardItem[]
  onItemClick: (id: string) => void
  RowComponent: React.ReactElement
}

export const DashboardTable = (props: DashboardTableProps) => {
  const { items, onItemClick, RowComponent } = props

  return (
    <>
      <Table className="w-full">
        <Table.Header columns={["Название", "Описание"]} />
        <Table.Body>
          {items.map((item) =>
            React.createElement(
              RowComponent.type,
              Object.assign(RowComponent.props ?? {}, {
                onClick: () => onItemClick(item.id),
                key: item.id,
                data: item,
              })
            )
          )}
        </Table.Body>
      </Table>
    </>
  )
}
