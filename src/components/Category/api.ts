"use server"
import { API, getEndpoint } from "@/shared/constants"
import { Category, CategoryDTO } from "./types"
import { revalidateTag } from "next/cache"
import { fetchWithAuth } from "@/shared/utils"

// Добавить обработку этого. РАньше была в fetchWithAuth
// const HTTP_STATUS_BAD_REQUEST = 400 as const

enum ERROR_MESSAGES {
  getAll = "Ошибка при получении списка категорий",
  update = "Ошибка при обновлении категории",
  create = "Ошибка при добавлении категории",
  delete = "Ошибка удаления категории",
}
type ResponseValidationError = Record<string, string[]>

const categoryTag = "category" as const

// Функция для получения категорий
export const getCategories = async (
  isAdmin?: boolean
): Promise<Category[]> => {
  try {
    const res = await fetch(getEndpoint(API.categories.getAll()), {
      cache: isAdmin ? "no-cache" : "force-cache",
      next: { revalidate: 3600, tags: [categoryTag] },
    })

    if (res.ok) {
      return await res.json()
    }

    console.error(ERROR_MESSAGES.getAll)
    return []
  } catch (error) {
    console.error(error)
    return []
  }
}

// Функция для обновления категории
export const updateCategory = async (
  id: string,
  payload: CategoryDTO
): Promise<string | ResponseValidationError> => {
  try {
    await fetchWithAuth(
      getEndpoint(API.categories.update(id), true),
      "PATCH",
      JSON.stringify(payload)
    )
    revalidateTag(categoryTag)

    return "Обновление успешно"
  } catch (error) {
    console.error(`Ошибка в updateCategory: ${error}`)
    return ERROR_MESSAGES.update
  }
}

// Функция для добавления категории
export const addCategory = async (
  data: CategoryDTO
): Promise<string | ResponseValidationError> => {
  try {
    await fetchWithAuth(
      getEndpoint(API.categories.add(), true),
      "POST",
      JSON.stringify(data)
    )
    revalidateTag(categoryTag)

    return "Добавление успешно"
  } catch (error) {
    console.error(`Ошибка в addCategory: ${error}`)
    return ERROR_MESSAGES.create
  }
}

// Функция для удаления категории
export const deleteCategory = async (id: string): Promise<string> => {
  try {
    await fetchWithAuth(
      getEndpoint(API.categories.delete(id), true),
      "DELETE"
    )
    revalidateTag(categoryTag)
    return "Удаление успешно"
  } catch (error) {
    console.error(`Ошибка в deleteCategory: ${error}`)
    return ERROR_MESSAGES.delete
  }
}
