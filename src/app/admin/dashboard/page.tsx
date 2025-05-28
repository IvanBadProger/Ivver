import {
  DashboardHeaderSwitcher,
  DashboardTableSwitcher,
} from "@/components/Admin"

type DashboardProps = {
  searchParams: Promise<{
    tab?: "products" | "categories"
    page?: string
  }>
}

export default async function Dashboard({
  searchParams,
}: DashboardProps) {
  const { tab = "products", page = "1" } = await searchParams

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <DashboardHeaderSwitcher tab={tab} />
      <DashboardTableSwitcher tab={tab} page={page} />
    </div>
  )
}
