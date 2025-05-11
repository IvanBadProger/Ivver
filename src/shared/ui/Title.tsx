import clsx from "clsx"
import React from "react"

interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Размер заголовка (mobile first)
   * @property xs - 16px (1rem) → 18px (1.125rem)
   * @property sm - 20px (1.25rem) → 24px (1.5rem)
   * @property md - 24px (1.5rem) → 30px (1.875rem)
   * @property lg - 30px (1.875rem) → 36px (2.25rem)
   * @property xl - 36px (2.25rem) → 48px (3rem)
   * @property 2xl - 48px (3rem) → 60px (3.75rem)
   * @default "sm"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

  /**
   * HTML тег заголовка
   * По умолчанию выбирается на основе размера:
   * xs → h5, sm → h4, md → h3, lg → h2, xl/2xl → h1
   */
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

  /**
   * Жирность текста
   * @default "bold"
   */
  weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold"

  /**
   * Выравнивание текста
   * @default "left"
   */
  align?: "left" | "center" | "right"
}

const TITLE_SIZE_STYLES = {
  xs: "text-base",
  sm: "text-lg md:text-base",
  md: "text-xl md:text-lg",
  lg: "text-2xl md:text-xl",
  xl: "text-3xl md:text-2xl",
  "2xl": "text-4xl md:text-3xl",
} as const

const TITLE_TAG_NAME_BY_SIZE = {
  xs: "h5",
  sm: "h4",
  md: "h3",
  lg: "h2",
  xl: "h1",
  "2xl": "h1",
} as const

const TITLE_WEIGHT_STYLES = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
} as const

const TITLE_ALIGN_STYLES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const

export const Title = (props: TitleProps) => {
  const {
    children,
    tagName,
    size = "sm",
    weight = "bold",
    align = "left",
    className,
    ...rest
  } = props
  const tag = tagName ?? TITLE_TAG_NAME_BY_SIZE[size]

  return React.createElement(
    tag,
    {
      className: clsx(
        TITLE_SIZE_STYLES[size],
        TITLE_WEIGHT_STYLES[weight],
        TITLE_ALIGN_STYLES[align],
        "tracking-tight",
        className
      ),
      ...rest,
    },
    children
  )
}
