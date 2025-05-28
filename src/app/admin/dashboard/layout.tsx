import { Metadata } from "next"
import { AdminSidebar } from "@/components/Admin/AdminSidebar"
import { Title } from "@/shared/ui"
import Link from "next/link"
import { getToken } from "@/shared/utils"
import { ROUTES } from "@/shared/constants"

export const metadata: Metadata = {
  title: "Администратор",
  robots: {
    index: false,
    follow: false,
  },
}

type Props = {
  readonly children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const token = await getToken()

  if (token) {
    return (
      <section className="relative flex gap-x-4 my-8 px-4">
        <AdminSidebar />
        <div className="shrink grow">{children}</div>
      </section>
    )
  } else {
    return (
      <div className="flex justify-center items-center flex-col mt-8 gap-y-2">
        <Title size="2xl" align="center">
          Вам необходимо войти в систему
        </Title>
        <p className="mb-4">
          Для продолжения работы пожалуйста войдите.
        </p>
        <Link
          href={ROUTES.AUTH}
          className="inline-block
        bg-primary-600 hover:bg-primary-400 
          font-medium rounded-lg text-sm text-white
          px-5 py-2.5 text-center mr-2 mb-2 
          transition duration-300 ease-in-out transform active:scale-95"
        >
          Вход
        </Link>
      </div>
    )
  }
}
