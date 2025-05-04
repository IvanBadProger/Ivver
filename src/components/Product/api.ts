import { API, getEndpoint } from "@/shared/constants"
import { ProductDTO } from "./types"

export async function getProducts(category?: string) {
  // fix: добавить кэш
  const res = await fetch(
    getEndpoint(API.ENDPOINTS.PRODUCTS.GET_ALL(category))
  )
  const data = await res.json()

  return data
}

export async function getProductById(id: string) {
  const res = await fetch(
    getEndpoint(API.ENDPOINTS.PRODUCTS.GET_BY_ID(id))
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
