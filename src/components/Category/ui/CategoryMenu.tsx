"use client"
import { Menu, MenuItem } from "@/widgets"
import { Category } from "../types"
import { useSearchParams } from "next/navigation"

type CategoryMenuProps = {
  categories: Category[]
}

export const CategoryMenu = (props: CategoryMenuProps) => {
  const { categories } = props

  const params = useSearchParams()
  const activeCategory = params.get("category") ?? "all"

  // fix: надо как-то переработать этот момент
  const menuItems = categories.map(
    ({ name, id }) =>
      new MenuItem({
        value: id,
        label: name,
        paramName: "category",
        pathname: "",
      })
  )

  return <Menu menuItems={menuItems} activeValue={activeCategory} />
}
