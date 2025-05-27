import clsx from "clsx"
import { HTMLAttributes } from "react"

type TableProps = React.TableHTMLAttributes<HTMLTableElement>

function Table(props: TableProps) {
  const { children, className, ...rest } = props

  return (
    <table
      className={clsx(
        "divide-y divide-gray-200 overflow-auto",
        className
      )}
      {...rest}
    >
      {children}
    </table>
  )
}

interface TableHeaderProps {
  columns: string[]
  className?: string
}

Table.Header = function TableHeader(props: TableHeaderProps) {
  const { columns, className } = props

  return (
    <thead className={clsx("bg-gray-50", className)}>
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

interface TableBodyProps extends React.PropsWithChildren {
  className?: string
}

Table.Body = function TableBody(props: TableBodyProps) {
  const { children, className } = props

  return (
    <tbody className={clsx("divide-y divide-gray-200", className)}>
      {children}
    </tbody>
  )
}

Table.Row = function TableRow(
  props: HTMLAttributes<HTMLTableRowElement>
) {
  const { children, className, ...rest } = props

  return (
    <tr className={clsx("hover:bg-gray-50", className)} {...rest}>
      {children}
    </tr>
  )
}

interface TableCellProps extends React.PropsWithChildren {
  className?: string
  onClick?: () => void
}

Table.Cell = function TableCell(props: TableCellProps) {
  const { children, className } = props

  return (
    <td
      className={clsx(
        "py-4 px-6 whitespace-nowrap truncate",
        className
      )}
    >
      {children}
    </td>
  )
}

export { Table }
