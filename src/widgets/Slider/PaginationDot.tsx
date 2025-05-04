"use client"
import { Button } from "@/shared/ui"

interface PaginationDotProps {
  index: number
  isActive: boolean
  onClick: () => void
  disabled: boolean
}

export const PaginationDot = (props: PaginationDotProps) => {
  const { index, isActive, onClick, disabled } = props

  return (
    <Button
      onClick={onClick}
      mode={isActive ? "primary" : "outline"}
      className="rounded-full"
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      label={`Перейти к слайду ${index + 1}`}
    />
  )
}
