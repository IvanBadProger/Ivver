import clsx from "clsx"
import { withFieldContainer } from "../HOC/withFieldContainer"

type InputBaseProps = React.InputHTMLAttributes<HTMLInputElement>

const InputBase = (props: InputBaseProps) => {
  const { className, ...restInputProps } = props

  return (
    <input
      className={clsx(
        "block w-full rounded-md border-gray-300 shadow-sm px-4 py-2",
        "focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50",
        "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
        "aria-[invalid=true]:border-red-300",
        className
      )}
      {...restInputProps}
    />
  )
}

export const Input = withFieldContainer(InputBase)
