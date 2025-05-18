import { Metadata } from "next"
import { AdminSidebar } from "@/components/Admin/AdminSidebar"

export const metadata: Metadata = {
  title: "Администратор",
}

type Props = Readonly<{
  children: React.ReactNode
}>

export default function DashboardLayout({ children }: Props) {
  return (
    <section className="relative flex gap-x-4 my-8 container mx-auto">
      <AdminSidebar />
      <div className="shrink grow">{children}</div>
    </section>
  )
}
