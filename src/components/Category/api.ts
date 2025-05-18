import { API, getEndpoint } from "@/shared/constants"
import { Category, CategoryDTO } from "./types"

export const getCategories = async (
  isAdmin?: boolean
): Promise<Category[]> => {
  const res = await fetch(getEndpoint(API.categories.getAll()), {
    cache: isAdmin ? "no-cache" : "force-cache",
    next: { revalidate: 3600 },
  })

  if (res.ok) {
    return await res.json()
  } else {
    alert("Ошибка при получении категорий")
    return []
  }
}
type ResponseValidationError = Record<string, string[]>

export const updateCategory = async (
  id: string,
  payload: CategoryDTO
): Promise<string | ResponseValidationError> => {
  const res = await fetch(
    getEndpoint(API.categories.update(id), true),
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(payload),
    }
  )

  if (res.ok) {
    return "Обновление успешно"
  } else if (res.status === 400) {
    return (await res.json()) as ResponseValidationError
  } else {
    return "Ошибка при обновлении категории"
  }
}

export const addCategory = async (
  data: CategoryDTO
): Promise<string | ResponseValidationError> => {
  const res = await fetch(getEndpoint(API.categories.add(), true), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })

  if (res.ok) {
    return "Добавление успешно"
  } else if (res.status === 400) {
    return (await res.json()) as ResponseValidationError
  } else {
    return "Ошибка при добавлении категории"
  }
}

export const deleteCategory = async (id: string) => {
  console.log(`Удаление ${id}`)
}
