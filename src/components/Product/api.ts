"use server"
import { API, getEndpoint } from "@/shared/constants"
import { Product } from "./types"
import { ProductForm } from "./ui/ProductForm/types"
import { revalidateTag } from "next/cache"
import { Paginator } from "@/shared/types"
import { getToken } from "@/shared/utils"

enum MESSAGES {
  createError = "Ошибка при добавлении товара",
  createSuccess = "Добавление товара успешно",
  unathorization = "Вы не авторизованы! ",
  uploadPhotoError = "Ошибка при добавлении фото",
  uploadPhoto = "Добавление фото успешно",
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

export async function addProduct(product: ProductForm) {
  try {
    const res = await fetch(getEndpoint(API.products.add(), true), {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify(product),
    })

    revalidateTag("products")

    if (res.ok) {
      return {
        message: MESSAGES.createSuccess,
        data: await res.json(),
      }
    } else if (res.status === 400) {
      const data = await res.json()
      console.error(data)
      return data
    } else if (res.status === 401) {
      return MESSAGES.unathorization
    }

    return MESSAGES.createError
  } catch (error) {
    console.error(error)
    return MESSAGES.createError
  }
}

export async function uploadPhotos(photos: FormData, id: string) {
  try {
    const res = await fetch(
      getEndpoint(API.products.uploadPhotos(id), true),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        body: photos,
      }
    )

    revalidateTag("products")

    if (res.ok) {
      return MESSAGES.uploadPhoto
    } else if (res.status === 400) {
      console.error(await res.json())
      return MESSAGES.validatePhotoError
    } else if (res.status === 401) {
      return MESSAGES.unathorization
    }

    return MESSAGES.uploadPhotoError
  } catch (error) {
    console.error(error)
    return MESSAGES.uploadPhotoError
  }
}

export async function uploadPreviewPhoto(
  preview: FormData,
  id: string
) {
  try {
    const res = await fetch(
      getEndpoint(API.products.uploadPreview(id), true),
      {
        method: "POST",
        body: preview,
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    )

    revalidateTag("products")

    if (res.ok) {
      return MESSAGES.uploadPreviewSuccess
    } else if (res.status === 400) {
      console.error(await res.json())
      return MESSAGES.uploadPreviewValidation
    } else if (res.status === 401) {
      return MESSAGES.unathorization
    }

    return MESSAGES.uploadPreviewError
  } catch (error) {
    console.error(error)
    return MESSAGES.uploadPreviewError
  }
}

export async function removeProductPhotos(
  productId: string,
  photosUrl: string[]
) {
  const res = await fetch(
    getEndpoint(API.products.removePhotos, true),
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({ photos: photosUrl }),
    }
  )

  revalidateTag("products")

  if (res.ok) {
    return MESSAGES.removePhotoSuccess
  } else if (res.status === 400) {
    console.error(await res.json())
    return MESSAGES.removePhotoValidation
  } else if (res.status === 401) {
    return MESSAGES.unathorization
  }

  return MESSAGES.removePhotoError
}

export async function updateProduct(id: string, data: ProductForm) {
  try {
    const res = await fetch(
      getEndpoint(API.products.update(id), true),
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(data),
      }
    )

    revalidateTag("products")

    if (res.ok) {
      return MESSAGES.updateSuccess
    } else if (res.status === 400) {
      const data = await res.json()
      console.error(data)
      return data
    } else if (res.status === 401) {
      return MESSAGES.unathorization
    }

    return MESSAGES.updateError
  } catch (error) {
    console.error(error)
    return MESSAGES.updateError
  }
}

export async function removeProduct(id: string) {
  try {
    const res = await fetch(
      getEndpoint(API.products.remove(id), true),
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${await getToken()}` },
      }
    )

    revalidateTag("products")

    if (res.ok) {
      return "Товар удален"
    } else if (res.status === 400) {
      const data = await res.json()
      console.error(data)
      return data
    } else if (res.status === 401) {
      return MESSAGES.unathorization
    }

    return "Ошибка при удалении товара"
  } catch (error) {
    console.error(error)
    return "Ошибка при удалении товара"
  }
}
