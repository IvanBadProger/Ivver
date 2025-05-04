import { withFieldContainer } from "../HOC/withFieldContainer"

export type Option = { value: string; name: string }

type SelectBaseProps = {
  options: Option[]
} & React.SelectHTMLAttributes<HTMLSelectElement>

const SelectBase = (props: SelectBaseProps) => {
  const { options, ...rest } = props

  return (
    <select
      className="block w-full rounded-md border-gray-300 px-4 py-2 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
      {...rest}
    >
      {options.map(({ value, name }) => (
        <option key={value + name} value={value}>
          {name}
        </option>
      ))}
    </select>
  )
}

export const Select = withFieldContainer(SelectBase)
