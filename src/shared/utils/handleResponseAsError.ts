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
        return {
          message: "Ошибка валидации",
          serverData: await res.json(),
        }

      default:
        return { message: "Неизвестная ошибка" }
    }
  }
}
