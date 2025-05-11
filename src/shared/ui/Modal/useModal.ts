"use client"
import { useEffect, useRef } from "react"

export const useModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openModal = () => {
    dialogRef.current?.showModal()
  }

  const closeModal = () => {
    dialogRef.current?.close()
  }

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }
    document.addEventListener("keydown", handleEscKey)

    return () => document.removeEventListener("keydown", handleEscKey)
  }, [])

  return {
    openModal,
    closeModal,
    dialogRef,
  }
}
