"use client"
import { Button } from "@/shared/ui"
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react"

interface NavigationButtonProps {
  direction: "prev" | "next"
  onClick: () => void
  disabled: boolean
}

export const NavigationButton = (props: NavigationButtonProps) => {
  const { direction, onClick, disabled } = props

  const label =
    direction === "prev" ? "Предыдущий слайд" : "Следующий слайд"
  const Icon =
    direction === "prev" ? <ArrowLeftSquare /> : <ArrowRightSquare />

  return (
    <Button
      onClick={onClick}
      mode="outline"
      disabled={disabled}
      label={label}
    >
      {Icon}
    </Button>
  )
}
