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

export const ROUTES = {
  HOME: "/",
  CATEGORIES: "/categories",
  AUTH: "/admin/auth",
  DASHBOARD: "/admin/dashboard",
} as const
