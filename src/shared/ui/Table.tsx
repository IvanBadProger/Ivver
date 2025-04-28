import { Product } from "@/components/Product"

interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table = (props: TableProps) => {
  const { children, ...rest } = props

  return <table {...rest}>{children}</table>
}

interface TableHeaderProps {
  columns: string[]
}

Table.Header = (props: TableHeaderProps) => {
  const { columns } = props

  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((c) => (
          <th
            key={c}
            className="py-3 px-6 text-left text-xs font-medium text-black uppercase tracking-wider"
            scope="col"
          >
            {c}
          </th>
        ))}
      </tr>
    </thead>
  )
}

interface TableBodyProps extends React.PropsWithChildren {}

Table.Body = function (props: TableBodyProps) {
  const { children } = props

  return (
    <tbody className="divide-y divide-gray-200">{children}</tbody>
  )
}
