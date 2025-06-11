import { Menu, MenuItem } from "@/widgets"
import { Category } from "../types"

type CategoryMenuProps = {
  categories: Category[]
  activeCategory: string
}

const createMenuItem = (value: string, name: string) => {
  return new MenuItem({
    value,
    paramName: "category",
    pathname: "",
    label: name,
  })
}

export const CategoryMenu = (props: CategoryMenuProps) => {
  const { categories, activeCategory } = props

  const menuItems = [
    createMenuItem("all", "Все"),
    ...categories.map(({ id, name }) => createMenuItem(id, name)),
  ]

  return <Menu menuItems={menuItems} activeValue={activeCategory} />
}
