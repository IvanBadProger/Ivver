"use server"
import { MESSAGES } from "../constants"
import { getToken } from "./getToken"

const HTTP_STATUS_UNAUTHORIZED = 401 as const

export const fetchWithAuth = async (
  url: string,
  method: string,
  body?: string | FormData,
  nextOptions?: RequestInit
): Promise<Response> => {
  const headers = {
    Authorization: `Bearer ${await getToken()}`,
  }
  const options: RequestInit = Object.assign(
    { ...nextOptions },
    {
      url,
      method,
      body,
      headers,
    }
  )

  const res = await fetch(url, options)

  if (res.status === HTTP_STATUS_UNAUTHORIZED) {
    throw new Error(MESSAGES.unauthorized)
  }

  return res
}
