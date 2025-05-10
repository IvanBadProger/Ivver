import { MenuItem } from "../../widgets/MenuItem"

export const ADMIN_MENU_ITEMS: MenuItem[] = [
  new MenuItem({
    value: "products",
    label: "Продукты",
    pathname: "dashboard",
    paramName: "tab",
  }),
  new MenuItem({
    value: "categories",
    label: "Категории",
    pathname: "dashboard",
    paramName: "tab",
  }),
]
