import { API, getEndpoint } from "@/shared/constants"
import { Category, CategoryDTO } from "./types"

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(
    getEndpoint(API.ENDPOINTS.CATEGORIES.GET_ALL)
  )
  const data = await res.json()

  return data ?? []
}

export const updateCategory = async (
  id: string,
  payload: CategoryDTO
) => {
  const res = await fetch(
    getEndpoint(API.ENDPOINTS.CATEGORIES.UPDATE(id), true),
    { method: "PATCH", headers: {}, body: JSON.stringify(payload) }
  )
  return await res.json()
}

export const addCategory = async (data: CategoryDTO) => {
  const res = await fetch(
    getEndpoint(API.ENDPOINTS.CATEGORIES.ADD, true),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  )
  return await res.json()
}
