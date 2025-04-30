"use client"
import { useRef } from "react"

export const useModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
  }

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close()
    }
  }

  return {
    openModal,
    closeModal,
    dialogRef,
  }
}
