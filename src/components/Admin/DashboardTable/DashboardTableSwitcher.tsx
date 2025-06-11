import { Suspense } from "react"
import { Loading } from "@/widgets"
import { Title } from "@/shared/ui"
import { LinkToDashboard } from "../LinkToDashboard"
import { ProductTableContainer } from "@/components/Product"
import { CategoriesTableContainer } from "@/components/Category"
import { TabType } from "../types"

type DashboardTableSwitcherProps = {
  tab: TabType
  page: string
}

export const DashboardTableSwitcher = ({
  tab,
  page,
}: DashboardTableSwitcherProps) => {
  let content: React.ReactNode

  switch (tab) {
    case "products":
      content = <ProductTableContainer page={page} />
      break
    case "categories":
      content = <CategoriesTableContainer />
      break

    default:
      content = (
        <div className="flex flex-col justify-center items-center gap-y-4">
          <Title size="xl" align="center">
            Что-то пошло не так...
          </Title>
          <p className="mb-4 text-gray-600">
            Данные не были найдены или произошла ошибка. Попробуйте
            вернуться назад.
          </p>
          <LinkToDashboard />,
        </div>
      )
  }

  return <Suspense fallback={<Loading />}>{content}</Suspense>
}
