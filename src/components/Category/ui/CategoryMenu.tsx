import { Menu, MenuItem } from "@/widgets"
import { Category } from "../types"

type CategoryMenuProps = {
  categories: Category[]
  activeCategory: string
}

export const CategoryMenu = (props: CategoryMenuProps) => {
  const { categories, activeCategory } = props

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

  return (
    <Menu
      menuItems={[
        new MenuItem({
          value: "all",
          label: "Все",
          paramName: "category",
          pathname: "",
        }),
        ...menuItems,
      ]}
      activeValue={activeCategory}
    />
  )
}
