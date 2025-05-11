import clsx from "clsx"
import { forwardRef } from "react"

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Внешний вид кнопки
   */
  mode?: "primary" | "outline" | "secondary" | "ghost" | "danger"
  /**
   * Текст общий для атрибутов title и aria-label
   */
  label?: string
  /**
   * Дополнительные стили компонента
   *@note Переопределение стандартных стилей компонента может нарушить его оформление
   */
  className?: string
}

const BUTTON_MODE_STYLES = {
  primary:
    "border-primary-500 bg-primary-500 text-white hover:border-primary-700 hover:bg-primary-700",
  outline: "border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
  secondary:
    "border-primary-100 bg-primary-100 text-primary-600 hover:border-primary-200 hover:bg-primary-200",
  ghost:
    "border-transparent bg-transparent text-gray-700 hover:bg-gray-100",
  danger: "border-red-300 bg-white text-gray-700 hover:bg-red-100",
} as const

const BUTTON_BASE_STYLES = `
  rounded-lg border px-5 py-2.5 cursor-pointer
  flex items-center justify-center gap-2 
  font-medium shadow-sm transition-all
  focus:ring focus:ring-primary-200
  disabled:cursor-not-allowed disabled:opacity-70`

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props: ButtonProps, ref) {
    const {
      className,
      mode = "primary",
      type = "button",
      label,
      children,
      ...rest
    } = props

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          BUTTON_BASE_STYLES,
          BUTTON_MODE_STYLES[mode],
          className
        )}
        aria-label={label}
        title={label}
        {...rest}
      >
        {children}
      </button>
    )
  }
)
