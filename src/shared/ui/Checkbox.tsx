import { useId } from "react"

type CheckboxProps = {
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>

// fix: error состояние
export const Checkbox = (props: CheckboxProps) => {
  const { label, ...restInputProps } = props

  const checkboxId = useId()

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
        id={checkboxId}
        {...restInputProps}
      />
      <label
        htmlFor={checkboxId}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  )
}
