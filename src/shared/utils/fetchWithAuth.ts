"use server"
import { MESSAGES } from "../constants"
import { getToken } from "./getToken"

const HTTP_STATUS_UNAUTHORIZED = 401 as const

export const fetchWithAuth = async (
  url: string,
  method: string,
  body?: string | FormData
): Promise<Response> => {
  const headers = {
    Authorization: `Bearer ${await getToken()}`,
  }

  // QnA: он сам подтянет верный контент тайп?

  const res = await fetch(url, { method, headers, body })

  if (res.status === HTTP_STATUS_UNAUTHORIZED) {
    throw new Error(MESSAGES.unauthorized)
  }

  return res
}
