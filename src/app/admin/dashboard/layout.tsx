import { Metadata } from "next"
import { AdminSidebar } from "@/components/Admin/AdminSidebar"
import { cookies } from "next/headers"
import { Title } from "@/shared/ui"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Администратор",
}

type Props = Readonly<{
  children: React.ReactNode
}>

export default async function DashboardLayout({ children }: Props) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")

  if (token) {
    return (
      <section className="relative flex gap-x-4 my-8 px-4">
        <AdminSidebar />
        <div className="shrink grow">{children}</div>
      </section>
    )
  } else {
    return (
      <>
        <Title>Вы не авторизованны</Title>
        <Link href={"/admin/auth"}>Войти</Link>
      </>
    )
  }
}
