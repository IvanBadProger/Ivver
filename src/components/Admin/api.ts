"use server"
import { API, getEndpoint } from "@/shared/constants"
import { fetchWithAuth } from "@/shared/utils"
import { handleResponseAsError } from "@/shared/utils/handleResponseAsError"
import { cookies } from "next/headers"

const TOKEN_COOKIE_NAME = "token" as const
const TOKEN_EXPIRATION = 259200 as const
const MESSAGES = {
  loginFailed: "Неверный логин или пароль",
  loginSuccess: "Успешный вход",
  unknownError: "Неизвестная ошибка. Попробуйте позже",
  logoutError: "Ошибка при выходе. Попробуйте позже.",
  logoutSuccess: "Успешный выход",
  generalError: "Произошла ошибка. Попробуйте позже",
} as const

const updateTokenInCookie = async (token: string): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    maxAge: TOKEN_EXPIRATION,
  })
}

const deleteTokenInCookie = async (): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_COOKIE_NAME)
}

export const login = async (payload: {
  login: string
  password: string
}): Promise<{ message: string; isSuccess: boolean }> => {
  try {
    const res = await fetch(getEndpoint(API.admin.login), {
      method: "POST",
      body: JSON.stringify(payload),
    })

    const { message: errorMessage } =
      (await handleResponseAsError(res)) ?? {}

    if (errorMessage)
      return { message: errorMessage, isSuccess: false }

    const { token } = (await res.json()) as { token: string }
    await updateTokenInCookie(token)

    return { message: MESSAGES.loginSuccess, isSuccess: true }
  } catch (error) {
    console.error(error)
    return { message: MESSAGES.generalError, isSuccess: false }
  }
}

export const logout = async (token: string): Promise<string> => {
  if (!token.trim()) return MESSAGES.generalError

  try {
    await fetchWithAuth(getEndpoint(API.admin.logout), "DELETE")

    await deleteTokenInCookie()

    return MESSAGES.logoutSuccess
  } catch (error) {
    console.error(error)
    return MESSAGES.generalError
  }
}
