const BaseUrls = {
  DEFAULT: process.env.API_URL_DEFAULT,
  ADMIN: process.env.API_URL_ADMIN,
} as const

enum CategoryEndpoints {
  BASE = "categories",
  ADD = "categories/add",
}

enum ProductEndpoints {
  BASE = "products",
  ADD = "products/add",
}

enum UnitsEndpoints {
  BASE = "measurement-units",
}

export const API = {
  categories: {
    getAll: () => CategoryEndpoints.BASE,
    add: () => CategoryEndpoints.ADD,
    getById: (id: string) => `${CategoryEndpoints.BASE}/${id}`,
    update: (id: string) => `${CategoryEndpoints.BASE}/${id}/update`,
    delete: (id: string) => `${CategoryEndpoints.BASE}/${id}/delete`,
  },
  products: {
    getAll: (category: string, page: string) => {
      const params = new URLSearchParams({
        category,
        page,
      })
      return `${ProductEndpoints.BASE}${
        params ? "?" + params.toString() : ""
      }`
    },
    getById: (id: string) => `${ProductEndpoints.BASE}/${id}`,
    add: () => ProductEndpoints.ADD,
    update: (id: string) => `${ProductEndpoints.BASE}/${id}/update`,
    uploadPhotos: (id: string) =>
      `${ProductEndpoints.BASE}/${id}/photos/upload`,
    uploadPreview: (id: string) =>
      `${ProductEndpoints.BASE}/${id}/photos/upload-preview`,
    removePhotos: `${ProductEndpoints.BASE}/photos/remove`,
    remove: (id: string) => `${ProductEndpoints.BASE}/${id}/delete`,
  },
  units: {
    getAll: `${UnitsEndpoints.BASE}`,
  },
  admin: {
    login: `login`,
    logout: `logout`,
  },
} as const

export const getEndpoint = (
  url: string,
  isAdmin: boolean = false
): string => {
  const baseUrl = isAdmin ? BaseUrls.ADMIN : BaseUrls.DEFAULT
  return baseUrl + url
}
