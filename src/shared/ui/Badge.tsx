import clsx from "clsx"

type BadgeSize = "sm" | "xs" | "lg" | "xl"

type BadgeProps = {
  size?: BadgeSize
  text: string
  className?: string
}

const BADGE_SIZES: Record<BadgeSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  lg: "text-lg",
  xl: "text-xl",
} as const

export const Badge = (props: BadgeProps) => {
  const { size = "xs", text, className } = props

  return (
    <span
      className={clsx(
        "rounded-full bg-primary-50 px-3 py-1 font-semibold text-primary-600",
        BADGE_SIZES[size],
        className
      )}
    >
      {text}
    </span>
  )
}
