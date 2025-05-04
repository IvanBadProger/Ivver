export const API = {
  BASE_URL: "http://127.0.0.1:8000/api/",
  ENDPOINTS: {
    CATEGORIES: {
      GET_ALL: "categories",
      ADD: "categories/add",
      GET_BY_ID: (id: string) => `categories/show/${id}`,
      UPDATE: (id: string) => `categories/update/${id}`,
    },
    PRODUCTS: {
      GET_ALL: (category?: string) =>
        category ? `products?category=${category}` : "products",
      GET_BY_ID: (id: string) => `products/show/${id}`,
      ADD: (id: string) => `products/add/${id}`,
    },
  },
} as const

export const getEndpoint = (
  url: string,
  isAdmin: boolean = false
) => {
  const base = isAdmin ? API.BASE_URL + "admin/" : API.BASE_URL

  return base + url
}
