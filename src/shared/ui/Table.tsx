import clsx from "clsx"
import { HTMLAttributes } from "react"

type TableProps = React.TableHTMLAttributes<HTMLTableElement>

function Table(props: TableProps) {
  const { children, className, ...rest } = props

  return (
    <table
      className={clsx("divide-y divide-gray-200", className)}
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

Table.Header = (props: TableHeaderProps) => {
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

Table.Body = function (props: TableBodyProps) {
  const { children, className } = props

  return (
    <tbody className={clsx("divide-y divide-gray-200", className)}>
      {children}
    </tbody>
  )
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

Table.Row = function (props: TableRowProps) {
  const { children, className, ...rest } = props

  return (
    <tr className={clsx("hover:bg-gray-50", className)} {...rest}>
      {children}
    </tr>
  )
}

interface TableCellProps extends React.PropsWithChildren {
  className?: string
}

Table.Cell = function (props: TableCellProps) {
  const { children, className } = props

  return (
    <td className={clsx("py-4 px-6 whitespace-nowrap", className)}>
      {children}
    </td>
  )
}

// fix: typescript не видит свойство displayName, хотя оно работает. Я нипон
Table.Header.displayName = "Table-Header"
Table.Body.displayName = "Table-body"
Table.Row.displayName = "Table-row"
Table.Cell.displayName = "Table-cell"

export { Table }
