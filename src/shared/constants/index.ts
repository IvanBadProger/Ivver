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
