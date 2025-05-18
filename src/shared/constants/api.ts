enum BaseUrls {
  DEFAULT = "http://127.0.0.1:8000/api/",
  ADMIN = "http://127.0.0.1:8000/api/admin/",
}

enum CategoryEndpoints {
  BASE = "categories",
  ADD = "categories/add",
}

enum ProductEndpoints {
  BASE = "products",
  ADD = "products/add",
}

export const API = {
  categories: {
    getAll: () => CategoryEndpoints.BASE,
    add: () => CategoryEndpoints.ADD,
    getById: (id: string) => `${CategoryEndpoints.BASE}/${id}`,
    update: (id: string) => `${CategoryEndpoints.BASE}/${id}/update`,
  },
  products: {
    getAll: (category?: string) =>
      category
        ? `${ProductEndpoints.BASE}?category=${category}`
        : ProductEndpoints.BASE,
    getById: (id: string) => `${ProductEndpoints.BASE}/${id}`,
    add: () => ProductEndpoints.ADD,
    update: (id: string) => `${ProductEndpoints.BASE}/${id}/update`,
    uploadPhotos: (id: string) =>
      `${ProductEndpoints.BASE}/${id}/photos/upload`,
  },
} as const

export const getEndpoint = (
  url: string,
  isAdmin: boolean = false
): string => {
  const baseUrl = isAdmin ? BaseUrls.ADMIN : BaseUrls.DEFAULT
  return baseUrl + url
}
