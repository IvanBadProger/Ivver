// "use server"
// import { API, getEndpoint } from "@/shared/constants"
// import { Category, CategoryDTO } from "./types"
// import { revalidateTag } from "next/cache"
// import { getToken } from "@/shared/utils"

// type ResponseValidationError = Record<string, string[]>

// enum ERROR_MESSAGES {
//   getAll = "Ошибка при получении списка категорий",
//   update = "Ошибка при обновлении категории",
//   unathorization = "Вы не авторизованы! ",
//   create = "Ошибка при добавлении категории",
//   delete = "Ошибка удаления категории",
// }

// const categoryTag = "category" as const

// export const getCategories = async (
//   isAdmin?: boolean
// ): Promise<Category[]> => {
//   try {
//     const res = await fetch(getEndpoint(API.categories.getAll()), {
//       cache: isAdmin ? "no-cache" : "force-cache",
//       next: { revalidate: 3600, tags: [categoryTag] },
//     })

//     if (res.ok) {
//       return await res.json()
//     }

//     console.error(ERROR_MESSAGES.getAll)
//     return []
//   } catch (error) {
//     console.error(error)
//     return []
//   }
// }

// export const updateCategory = async (
//   id: string,
//   payload: CategoryDTO
// ): Promise<string | ResponseValidationError> => {
//   try {
//     const res = await fetch(
//       getEndpoint(API.categories.update(id), true),
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json;charset=utf-8",
//           Authorization: `Bearer ${await getToken()}`,
//         },
//         body: JSON.stringify(payload),
//       }
//     )

//     console.log(`Bearer ${await getToken()}`)

//     revalidateTag(categoryTag)

//     if (res.ok) {
//       return "Обновление успешно"
//     } else if (res.status === 400) {
//       return (await res.json()) as ResponseValidationError
//     } else if (res.status === 401) {
//       return ERROR_MESSAGES.unathorization
//     }

//     return ERROR_MESSAGES.update
//   } catch (error) {
//     console.error(error)
//     return ERROR_MESSAGES.update
//   }
// }

// export const addCategory = async (
//   data: CategoryDTO
// ): Promise<string | ResponseValidationError> => {
//   try {
//     const res = await fetch(getEndpoint(API.categories.add(), true), {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//         Authorization: `Bearer ${await getToken()}`,
//       },
//       body: JSON.stringify(data),
//     })

//     revalidateTag(categoryTag)

//     if (res.ok) {
//       return "Добавление успешно"
//     } else if (res.status === 400) {
//       return (await res.json()) as ResponseValidationError
//     } else if (res.status === 401) {
//       return ERROR_MESSAGES.unathorization
//     }

//     return ERROR_MESSAGES.create
//   } catch (error) {
//     console.error(error)
//     return ERROR_MESSAGES.create
//   }
// }

// export const deleteCategory = async (id: string) => {
//   try {
//     console.log(`Удаление ${id}`)
//   } catch (error) {
//     console.error(error)
//     return ERROR_MESSAGES.delete
//   }
// }
