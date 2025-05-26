"use server"
import { API, getEndpoint } from "@/shared/constants"
import { Product } from "./types"
import { ProductForm } from "./ui/ProductForm/types"
import { revalidateTag } from "next/cache"
import { Paginator } from "@/shared/types"

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
  const res = await fetch(getEndpoint(API.products.add(), true), {
    method: "POST",
    headers: {},
    body: JSON.stringify(product),
  })

  revalidateTag("products")

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

  revalidateTag("products")

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

  revalidateTag("products")

  if (res.ok) {
    return "Добавление превью успешно"
  } else if (res.status === 400) {
    console.error(await res.json())
    return "Валидация превью не прошло"
  } else {
    return "Ошибка при добавлении превью"
  }
}

export async function removeProductPhotos(
  productId: string,
  photosUrl: string[]
) {
  const res = await fetch(
    getEndpoint(API.products.removePhotos(productId), true),
    {
      method: "DELETE",
      body: JSON.stringify(photosUrl),
    }
  )
  revalidateTag("products")

  if (res.ok) {
    return "Удаление фото успешно"
  } else if (res.status === 400) {
    console.error(await res.json())
    return "Валидация не прошла при удалении фото"
  } else {
    return "Ошибка при удалении фото"
  }
}

export async function updateProduct(id: string, data: ProductForm) {
  try {
    const res = await fetch(
      getEndpoint(API.products.update(id), true),
      { method: "PATCH", body: JSON.stringify(data) }
    )
    revalidateTag("products")

    if (res.ok) {
      return "Обновление товара успешно"
    } else if (res.status === 400) {
      const data = await res.json()
      console.error(data)
      return data
    } else {
      return "Ошибка при обновлении товара"
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getMeasurementUnits() {
  const res = await fetch(getEndpoint(API.units.getAll, true), {
    cache: "force-cache",
    next: { tags: ["units"] },
  })

  if (res.ok) {
    return await res.json()
  } else {
    return "Ошибка при получении единиц измерения"
  }
}
