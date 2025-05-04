import clsx from "clsx"
import { withFieldContainer } from "../HOC/withFieldContainer"
import { forwardRef } from "react"

type TextAreaBaseProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextAreaBase = forwardRef<
  HTMLTextAreaElement,
  TextAreaBaseProps
>((props: TextAreaBaseProps, ref) => {
  const { className, children, ...rest } = props

  return (
    <textarea
      ref={ref}
      className={clsx(
        "block w-full rounded-md border-gray-300 shadow-sm resize-y max-h-30 px-4 py-2",
        "focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </textarea>
  )
})

TextAreaBase.displayName = "TextAreaBase"

export const TextArea = withFieldContainer(TextAreaBase)
