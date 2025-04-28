import clsx from "clsx"

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: "primary" | "outline" | "secondary" | "ghost" | "danger"
  label?: string
}

export function Button(props: ButtonProps) {
  const {
    className,
    mode = "primary",
    type = "button",
    label,
    children,
    ...rest
  } = props

  const modeStyles = {
    primary:
      "border-primary-500 bg-primary-500 text-white hover:border-primary-700 hover:bg-primary-700",
    outline:
      "border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
    secondary:
      "border-primary-100 bg-primary-100 text-primary-600 hover:border-primary-200 hover:bg-primary-200",
    ghost:
      "border-transparent bg-transparent text-gray-700 hover:bg-gray-100 ",
    danger: "border-red-300 bg-white text-gray-700 hover:bg-red-100",
  }[mode]

  const baseStyles =
    "rounded-lg border px-5 py-2.5 text-center text-sm font-medium shadow-sm transition-all focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"

  return (
    <button
      type={type}
      className={clsx(baseStyles, modeStyles, className)}
      aria-label={label}
      title={label}
      {...rest}
    >
      {children}
    </button>
  )
}
