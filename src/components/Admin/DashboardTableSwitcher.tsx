import { CategoriesTableContainer } from "../Category"
import { ProductTableContainer } from "../Product"
import { TabType } from "./types"

type DashboardTableSwitcherProps = {
  tab: TabType
}

export const DashboardTableSwitcher = async ({
  tab,
}: DashboardTableSwitcherProps) => {
  switch (tab) {
    case "products":
      return <ProductTableContainer />

    case "categories":
      return <CategoriesTableContainer />

    default:
      break
  }
}
