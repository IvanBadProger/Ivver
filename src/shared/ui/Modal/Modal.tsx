"use client"
import { Button, Title } from "@/shared/ui/"
import clsx from "clsx"
import { forwardRef, useId, useRef } from "react"
import { X } from "lucide-react"

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  label?: string
  isLabelHidden?: boolean
  children: React.ReactNode
  onClose: () => void
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (props, ref) => {
    const { children, onClose, isLabelHidden, label, ...rest } = props
    const labelId = useId()
    const isMouseDownOnBackdrop = useRef(false)

    const onMouseDown = (event: React.MouseEvent) => {
      const { currentTarget: dialogElement, target } = event
      isMouseDownOnBackdrop.current = dialogElement === target
    }

    const onMouseUp = (event: React.MouseEvent) => {
      const { currentTarget: dialogElement, target } = event
      const isMouseUpOnBackdrop = dialogElement === target

      if (isMouseUpOnBackdrop && isMouseDownOnBackdrop.current) {
        onClose()
      }

      isMouseDownOnBackdrop.current = false
    }

    return (
      <dialog
        className={clsx(
          "backdrop:bg-gray-50/50 backdrop:backdrop-blur-xs",
          "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
        )}
        ref={ref}
        aria-labelledby={labelId}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        {...rest}
      >
        <div className="py-6 px-8 ">
          <header className="flex justify-between items-center gap-x-4 mb-4">
            <Title
              size="md"
              className={clsx("", {
                "sr-only": isLabelHidden,
              })}
              id={labelId}
            >
              {label}
            </Title>
            <Button
              className="p-2! shadow-none! ml-auto"
              label="Закрыть модальное окно"
              mode="ghost"
              onClick={onClose}
            >
              <X />
            </Button>
          </header>
          {children}
        </div>
      </dialog>
    )
  }
)

Modal.displayName = "Modal"
