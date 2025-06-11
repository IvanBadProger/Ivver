import { ROUTES } from "@/shared/constants"
import { ArrowLeftCircle } from "lucide-react"
import Link from "next/link"

export const LinkToDashboard = () => {
  return (
    <Link
      className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-500 text-white rounded-lg transition-all duration-300 hover:bg-secondary-600 group"
      href={ROUTES.DASHBOARD}
    >
      <ArrowLeftCircle />
      <span>Вернуться назад</span>
    </Link>
  )
}
