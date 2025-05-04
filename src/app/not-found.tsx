import Link from "next/link"
import { Title } from "@/shared/ui"
import { CornerUpLeft } from "lucide-react"

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary-100">
      <div className="max-w-lg mx-auto text-center p-8">
        <Title
          size="2xl"
          align="left"
          className="text-primary-900 mb-4"
        >
          Ошибка 404
        </Title>

        <p className="text-primary-700 text-lg mb-8 animate-bounce">
          Упс! Страница не найдена
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-500 text-white rounded-lg transition-all duration-300 hover:bg-secondary-600 group"
        >
          <span className="relative">
            <CornerUpLeft className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
          </span>
          <span className="font-medium">Вернуться на главную</span>
        </Link>
      </div>
    </section>
  )
}
