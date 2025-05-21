import clsx from "clsx"
import { withFieldContainer } from "../HOC/withFieldContainer"

export type Option = { value: string; name: string }

interface SelectBaseProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "children"
  > {
  options: Option[]
}

const SELECT_STYLES = `
  block w-full rounded-md
  border-gray-300 px-4 py-2 shadow-sm
  focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50
  disabled:cursor-not-allowed disabled:bg-gray-50`

const SelectBase = (props: SelectBaseProps) => {
  const { options, className, ...rest } = props

  return (
    <select className={clsx(SELECT_STYLES, className)} {...rest}>
      <option value="">Не выбрано</option>
      {options.map(({ value, name }) => (
        <option key={value + name} value={value}>
          {name}
        </option>
      ))}
    </select>
  )
}

export const Select = withFieldContainer(SelectBase)
