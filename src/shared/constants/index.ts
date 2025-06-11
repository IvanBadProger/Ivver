export { API, getEndpoint } from "./api"

export const CONTACTS = {
  PHONE: "+70000000000",
  PHONE_LINK: function () {
    return `tel:${this.PHONE}`
  },
  EMAIL: "example@main.com",
  EMAIL_LINK: function () {
    return `mailto: ${this.EMAIL}`
  },
} as const

export enum ROUTES {
  HOME = "/",
  AUTH = "/admin/auth",
  DASHBOARD = "/admin/dashboard",
}

export enum MESSAGES {
  unauthorized = "Вы не авторизованы!",
}

export const MAIN_TOAST_CONTAINER_ID = "main-container-toast"
export const TOAST_REMOVE_PRODUCT_ID = "toast-remove-product"
