import { API, getEndpoint } from "@/shared/constants"
import { Product, ProductDTO } from "./types"

export async function getProducts(category?: string) {
  // fix: добавить кэш
  const res = await fetch(
    getEndpoint(API.ENDPOINTS.PRODUCTS.GET_ALL(category)),
    { cache: "force-cache" }
  )
  const data = await res.json()

  return data
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(
    getEndpoint(API.ENDPOINTS.PRODUCTS.GET_BY_ID(id)),
    { cache: "force-cache" }
  )
  const data = await res.json()

  return data
}

export async function addProduct(product: ProductDTO) {
  const res = await fetch(
    getEndpoint(API.ENDPOINTS.PRODUCTS.ADD, true),
    { method: "POST", headers: {}, body: JSON.stringify(product) }
  )
  const data = await res.json()

  return data
}

export async function updateProduct(id: string, data: ProductDTO) {
  const res = await fetch(
    getEndpoint(API.ENDPOINTS.PRODUCTS.UPDATE(id), true),
    { method: "PATCH", body: JSON.stringify(data) }
  )
  return await res.json()
}
