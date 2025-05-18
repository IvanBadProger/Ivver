import { Suspense } from "react"
import { Loading } from "@/widgets"
import {
  DashboardHeaderSwitcher,
  DashboardTableSwitcher,
} from "@/components/Admin"

type DashboardProps = {
  searchParams: Promise<{ tab?: "products" | "categories" }>
}

export default async function Dashboard({
  searchParams,
}: DashboardProps) {
  const { tab = "products" } = await searchParams

  return (
    <div className="mx-auto p-4 bg-white shadow-md rounded-lg overflow-x-auto">
      <DashboardHeaderSwitcher tab={tab} />
      <Suspense fallback={<Loading />}>
        <DashboardTableSwitcher tab={tab} />
      </Suspense>
    </div>
  )
}
