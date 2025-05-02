"use client"
import { useRef } from "react"

export const useModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openModal = () => {
    dialogRef.current?.showModal()
  }

  const closeModal = () => {
    dialogRef.current?.close()
  }

  return {
    openModal,
    closeModal,
    dialogRef,
  }
}
