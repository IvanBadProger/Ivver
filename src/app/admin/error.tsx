"use client"
import { LinkToDashboard } from "@/components/Admin"
import { Title } from "@/shared/ui"

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <Title size="xl" align="center">
        Что-то пошло не так...
      </Title>
      <p className="mb-4 text-gray-600">
        Данные не были найдены или произошла ошибка. Попробуйте
        вернуться назад.
      </p>
      <p>{error.name}</p>
      <p>{error.message}</p>
      <LinkToDashboard />
    </div>
  )
}
