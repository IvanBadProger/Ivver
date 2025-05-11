enum BaseUrls {
  DEFAULT = "http://127.0.0.1:8000/api/",
  ADMIN = "http://127.0.0.1:8000/api/admin/",
}

enum CategoryEndpoints {
  GET_ALL = "categories",
  ADD = "categories/add",
  GET_BY_ID = "categories/show",
  UPDATE = "categories/update",
}

enum ProductEndpoints {
  GET_ALL = "products",
  GET_BY_ID = "products/show",
  ADD = "products/add",
  UPDATE = "products/update",
}

export const API = {
  categories: {
    getAll: () => CategoryEndpoints.GET_ALL,
    add: () => CategoryEndpoints.ADD,
    getById: (id: string) => `${CategoryEndpoints.GET_BY_ID}/${id}`,
    update: (id: string) => `${CategoryEndpoints.UPDATE}/${id}`,
  },
  products: {
    getAll: (category?: string) =>
      category
        ? `${ProductEndpoints.GET_ALL}?category=${category}`
        : ProductEndpoints.GET_ALL,
    getById: (id: string) => `${ProductEndpoints.GET_BY_ID}/${id}`,
    add: () => ProductEndpoints.ADD,
    update: (id: string) => `${ProductEndpoints.UPDATE}/${id}`,
  },
} as const

export const getEndpoint = (
  url: string,
  isAdmin: boolean = false
): string => {
  const baseUrl = isAdmin ? BaseUrls.ADMIN : BaseUrls.DEFAULT
  return baseUrl + url
}
