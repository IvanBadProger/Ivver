"use server"
import { API, getEndpoint } from "@/shared/constants"
import { Product } from "./types"
import { ProductForm } from "./ui/ProductForm/types"
import { revalidateTag } from "next/cache"
import { Paginator } from "@/shared/types"
import { fetchWithAuth } from "@/shared/utils"
import { handleResponseAsError } from "@/shared/utils/handleResponseAsError"

enum MESSAGES {
  createError = "Ошибка при добавлении товара",
  createSuccess = "Добавление товара успешно",
  unathorization = "Вы не авторизованы! ",
  uploadPhotoError = "Ошибка при добавлении фото",
  uploadPhotoSuccess = "Добавление фото успешно",
  validatePhotoError = "Валидация фото не прошло",
  uploadPreviewError = "Ошибка при добавлении превью",
  uploadPreviewSuccess = "Добавление превью успешно",
  uploadPreviewValidation = "Валидация превью не прошло",
  removePhotoError = "Ошибка при удалении фото",
  removePhotoSuccess = "Удаление фото успешно",
  removePhotoValidation = "Валидация не прошла при удалении фото",
  updateSuccess = "Успешное обновление товара",
  updateError = "Ошибка при обновлении товара",
}

type ProductResponse = {
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>
}

export async function getProducts(
  category: string = "all",
  page: string = "1"
): Promise<Paginator> {
  try {
    const res = await fetch(
      getEndpoint(
        API.products.getAll(
          category === "all" ? "" : category,
          page === "1" ? "" : page
        )
      ),
      {
        cache: "force-cache",
        next: { tags: ["products"], revalidate: 3600 },
      }
    )
    const data = await res.json()

    return data
  } catch (error) {
    console.error(error)

    return {
      current_page: 1,
      data: [],
      from: 1,
      last_page: 1,
      links: [],
      path: "",
      per_page: 1,
      to: 1,
      total: 1,
    }
  }
}

export async function getProductById(
  id: string
): Promise<Product | void> {
  try {
    const res = await fetch(getEndpoint(API.products.getById(id)), {
      cache: "force-cache",
      next: { tags: ["products"], revalidate: 3600 },
    })
    const data = await res.json()

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function addProduct(
  product: ProductForm
): Promise<ProductResponse> {
  try {
    const res = await fetchWithAuth(
      getEndpoint(API.products.add(), true),
      "POST",
      JSON.stringify(product)
    )

    revalidateTag("products")

    const { message, serverData } =
      (await handleResponseAsError(res)) ?? {}

    return {
      message: message ?? MESSAGES.createSuccess,
      data: serverData ?? (await res.json()),
    }
  } catch (error) {
    console.error(error)
    return { message: MESSAGES.createError }
  }
}

export async function uploadPhotos(
  photos: FormData,
  id: string
): Promise<ProductResponse> {
  try {
    const res = await fetchWithAuth(
      getEndpoint(API.products.uploadPhotos(id), true),
      "POST",
      photos
    )

    revalidateTag("products")

    const { message, serverData } =
      (await handleResponseAsError(res)) ?? {}

    return {
      message: message ?? MESSAGES.uploadPhotoSuccess,
      data: serverData,
    }
  } catch (error) {
    console.error(error)
    return { message: MESSAGES.uploadPhotoError }
  }
}

export async function uploadPreviewPhoto(
  preview: FormData,
  id: string
): Promise<ProductResponse> {
  try {
    const res = await fetchWithAuth(
      getEndpoint(API.products.uploadPreview(id), true),
      "POST",
      preview
    )

    revalidateTag("products")

    const { message, serverData } =
      (await handleResponseAsError(res)) ?? {}

    return {
      message: message ?? MESSAGES.uploadPreviewSuccess,
      data: serverData,
    }
  } catch (error) {
    console.error(error)
    return { message: MESSAGES.uploadPreviewError }
  }
}

export async function removeProductPhotos(
  photosUrl: string[]
): Promise<ProductResponse> {
  try {
    const res = await fetchWithAuth(
      getEndpoint(API.products.removePhotos, true),
      "DELETE",
      JSON.stringify({ photos: photosUrl })
    )

    revalidateTag("products")
    const { message, serverData } =
      (await handleResponseAsError(res)) ?? {}

    return {
      message: message ?? MESSAGES.removePhotoSuccess,
      data: serverData,
    }
  } catch (error) {
    console.error(error)
    return { message: MESSAGES.removePhotoError }
  }
}

export async function updateProduct(
  id: string,
  data: ProductForm
): Promise<ProductResponse> {
  try {
    const res = await fetchWithAuth(
      getEndpoint(API.products.update(id), true),
      "PATCH",
      JSON.stringify(data)
    )

    revalidateTag("products")
    const { message, serverData } =
      (await handleResponseAsError(res)) ?? {}

    return {
      message: message ?? MESSAGES.updateSuccess,
      data: serverData,
    }
  } catch (error) {
    console.error(error)
    return { message: MESSAGES.updateError }
  }
}

export async function removeProduct(
  id: string
): Promise<ProductResponse> {
  try {
    const res = await fetchWithAuth(
      getEndpoint(API.products.remove(id), true),
      "DELETE"
    )

    revalidateTag("products")
    const { message, serverData } =
      (await handleResponseAsError(res)) ?? {}

    return { message: message ?? "Товар удален", data: serverData }
  } catch (error) {
    console.error(error)
    return { message: "Ошибка при удалении товара" }
  }
}
