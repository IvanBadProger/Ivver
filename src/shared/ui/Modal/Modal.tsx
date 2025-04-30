"use client"

import { Button } from "@/shared/ui"
import clsx from "clsx"
import { forwardRef, useId } from "react"
import { CrossIcon } from "../icons"

interface ModalProps {
  label: string
  isLabelHidden?: boolean
  children?: React.ReactNode
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (props, ref) => {
    const { children, isLabelHidden, label, ...rest } = props

    const labelId = useId()

    const onClose = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.close()
      }
    }

    const onBackdropClick = (event: React.MouseEvent) => {
      const { currentTarget: dialogElement, target } = event
      const isClickedOnBackDrop = dialogElement === target

      if (isClickedOnBackDrop) {
        onClose()
      }
    }

    return (
      <dialog
        className={clsx(
          "backdrop:bg-gray-50/50 backdrop:backdrop-blur-xs",
          "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
        )}
        ref={ref}
        aria-labelledby={labelId}
        onClick={onBackdropClick}
        {...rest}
      >
        <div className="py-6 px-8 ">
          <header className="flex justify-between items-center mb-4">
            <h2
              className={clsx("text-2xl font-bold", {
                "sr-only": isLabelHidden,
              })}
              id={labelId}
            >
              {label}
            </h2>
            <Button
              className="p-2! shadow-none! ml-auto"
              label="Закрыть модальное окно"
              mode="ghost"
              onClick={onClose}
            >
              <CrossIcon />
            </Button>
          </header>
          {children}
        </div>
      </dialog>
    )
  }
)
