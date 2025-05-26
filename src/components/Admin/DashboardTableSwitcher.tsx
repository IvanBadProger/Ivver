import { CategoriesTableContainer } from "../Category"
import { ProductTableContainer } from "../Product"
import { TabType } from "./types"

type DashboardTableSwitcherProps = {
  tab: TabType
  page: string
}

export const DashboardTableSwitcher = async ({
  tab,
  page,
}: DashboardTableSwitcherProps) => {
  switch (tab) {
    case "products":
      return <ProductTableContainer page={page} />

    case "categories":
      return <CategoriesTableContainer />

    default:
      break
  }
}
