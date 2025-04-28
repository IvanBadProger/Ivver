import clsx from "clsx"
import { withFieldContainer } from "../HOC/withFieldContainer"

type TextAreaBaseProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextAreaBase = (props: TextAreaBaseProps) => {
  const { className, children, ...rest } = props

  return (
    <textarea
      className={clsx(
        "block w-full rounded-md border-gray-300 shadow-sm px-4 py-2 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </textarea>
  )
}

export const TextArea = withFieldContainer(TextAreaBase)
