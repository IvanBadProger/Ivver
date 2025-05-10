import { ButtonCreateCategory } from "@/components/Category"
import { HeaderConfigItem, TabType } from "../types"
import { ButtonCreateProduct } from "@/components/Product"

export const HEADER_CONFIG: Record<TabType, HeaderConfigItem> = {
  products: {
    title: "Список товаров",
    searchLabel: "Поиск по товарам",
    button: <ButtonCreateProduct />,
  },
  categories: {
    title: "Список категорий",
    searchLabel: "Поиск по категориям",
    button: <ButtonCreateCategory />,
  },
} as const
