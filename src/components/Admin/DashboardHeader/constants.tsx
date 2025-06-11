import { ButtonCreateCategory } from "@/components/Category"
import { ButtonCreateProduct } from "@/components/Product"
import { HeaderConfigItem } from "./types"
import { TabType } from "../types"

type HeaderConfigKeys = TabType | "error"

export const HEADER_CONFIG: Record<
  HeaderConfigKeys,
  HeaderConfigItem
> = {
  products: {
    titleText: "Список товаров",
    searchLabel: "Поиск по товарам",
    button: <ButtonCreateProduct />,
  },
  categories: {
    titleText: "Список категорий",
    searchLabel: "Поиск по категориям",
    button: <ButtonCreateCategory />,
  },
  error: {
    titleText: "",
    searchLabel: "",
    button: "",
  },
} as const
