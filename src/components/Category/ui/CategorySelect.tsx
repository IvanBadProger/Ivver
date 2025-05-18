"use client"
import { Select } from "@/shared/ui"
import { getCategories } from "../api"
import { useEffect, useState } from "react"
import { Category } from "../types"

type CategorySelectProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    errorMessage?: string
  }

// fix: убрать useEffect
export const CategorySelect = (props: CategorySelectProps) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getCategories().then((res) => setCategories(res))
  }, [])

  const opts = categories.map(({ name, id }) => {
    return { name, value: id }
  })

  return (
    <Select label="Выберите категорию" options={opts} {...props} />
  )
}
