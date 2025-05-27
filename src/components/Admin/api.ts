"use server"
import { API, getEndpoint } from "@/shared/constants"
import { cookies } from "next/headers"

export const login = async (payload: {
  login: string
  password: string
}) => {
  try {
    const res = await fetch(getEndpoint(API.admin.login), {
      method: "POST",
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      const data = await res.json()
      const token: string = data.token

      const cookieStore = await cookies()
      cookieStore.delete("token")
      cookieStore.set("token", token, { maxAge: 259200 })

      return "Успешный вход"
    } else {
      return "Не успешный вход"
    }
  } catch (error) {
    console.error(error)
    return "Произошла ошибка. Попробуйте позже"
  }
}

export const Logout = async (token: string) => {
  try {
    const cookieStore = await cookies()

    const res = await fetch(getEndpoint(API.admin.logout), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })

    cookieStore.delete("token")
    return await res.json()
  } catch (error) {
    console.error(error)
    return "Произошла ошибка. Попробуйте позже"
  }
}
