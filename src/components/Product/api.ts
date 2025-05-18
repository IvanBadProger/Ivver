import { API, getEndpoint } from "@/shared/constants"
import { Product, ProductForm } from "./types"

export async function getProducts(
  category?: string,
  isAdmin: boolean = false
) {
  try {
    const res = await fetch(
      getEndpoint(API.products.getAll(category)),
      {
        cache: isAdmin || category ? "no-cache" : "force-cache",
        next: { revalidate: 3600 },
      }
    )
    const data = await res.json()

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(getEndpoint(API.products.getById(id)), {
    cache: "force-cache",
  })
  const data = await res.json()

  return data
}

export async function addProduct(product: ProductForm) {
  const res = await fetch(getEndpoint(API.products.add(), true), {
    method: "POST",
    headers: {},
    body: JSON.stringify(product),
  })

  if (res.ok) {
    return {
      message: "Добавление товара успешно",
      data: await res.json(),
    }
  } else if (res.status === 400) {
    const data = await res.json()
    console.error(data)
    return data
  } else {
    return "Ошибка при добавлении товара"
  }
}

export async function uploadPhotos(photos: FormData, id: string) {
  const res = await fetch(
    getEndpoint(API.products.uploadPhotos(id), true),
    {
      method: "POST",
      body: photos,
    }
  )

  if (res.ok) {
    return "Добавление фото успешно"
  } else if (res.status === 400) {
    console.error(await res.json())
    return "Валидация фото не прошло"
  } else {
    return "Ошибка при добавлении фото"
  }
}

export async function uploadPreviewPhoto(
  preview: FormData,
  id: string
) {
  const res = await fetch(
    getEndpoint(API.products.uploadPreview(id), true),
    {
      method: "POST",
      body: preview,
    }
  )

  if (res.ok) {
    return "Добавление превью успешно"
  } else if (res.status === 400) {
    console.error(await res.json())
    return "Валидация превью не прошло"
  } else {
    return "Ошибка при добавлении превью"
  }
}

export async function updateProduct(id: string, data: ProductForm) {
  const res = await fetch(
    getEndpoint(API.products.update(id), true),
    { method: "PATCH", body: JSON.stringify(data) }
  )

  if (res.ok) {
    return "Обновление товара успешно"
  } else if (res.status === 400) {
    const data = await res.json()
    console.error(data)
    return data
  } else {
    return "Ошибка при добавлении товара"
  }
}
