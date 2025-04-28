import clsx from "clsx"

type BadgeProps = {
  size?: "sm" | "xs"
  text: string
  className?: string
}

export const Badge = (props: BadgeProps) => {
  const { size = "xs", text, className } = props

  return (
    <span
      className={clsx(
        "rounded-full bg-primary-50 px-3 py-1 font-semibold text-primary-600",
        `text-${size}`,
        className
      )}
    >
      {text}
    </span>
  )
}
