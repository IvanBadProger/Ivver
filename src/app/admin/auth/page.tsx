import { AuthForm } from "@/components/Admin"
import { Title } from "@/shared/ui"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Администратор | Вход",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Auth() {
  return (
    <>
      <Title size="2xl" align="center" className="my-8">
        Вход для администратора
      </Title>
      <AuthForm />
    </>
  )
}
