export { API, getEndpoint } from "./api"
import { parsePhoneNumberFromString } from "libphonenumber-js"

const createPhoneEntry = (phone: string) => ({
  raw: phone,
  link: `tel:${phone}`,
  formatted: parsePhoneNumberFromString(phone)?.formatInternational() || phone,
})

export const CONTACTS = {
  PHONE1: createPhoneEntry("+79134737139"),
  PHONE2: createPhoneEntry("+79139099338"),
  PHONE3: createPhoneEntry("+79993309929"),
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
