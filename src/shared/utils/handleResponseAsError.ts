// const MESSAGES = {} as const

type ErrorData = {
  message: string
  serverData?: Record<string, string>
}

export const handleResponseAsError = async (
  res: Response
): Promise<ErrorData | void> => {
  if (!res.ok) {
    switch (res.status) {
      case 401:
        return { message: "Ошибка авторизации" }
      case 400:
        const data = await res.json()
        console.error(data)
        return {
          message: "Ошибка валидации",
          serverData: data,
        }

      default:
        return { message: "Неизвестная ошибка" }
    }
  }
}
