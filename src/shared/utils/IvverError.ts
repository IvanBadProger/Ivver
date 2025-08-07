export class IvverError extends Error {
  public statusCode?: number

  constructor(
    public message: string,
    public code?: string,
    statusCode?: number
  ) {
    super(message)
    this.name = "IvverError"
    this.statusCode = statusCode

    this.logError()
  }

  private logError() {
    console.error(`[${this.name}] ${this.code}: ${this.message}`)
  }

  public static unauthorized() {
    return new IvverError(
      "ERROR_MESSAGES.unathorization",
      "UNAUTHORIZED",
      401
    )
  }

  public static notFound() {
    return new IvverError(
      "Запрашиваемый ресурс не найден!",
      "NOT_FOUND",
      404
    )
  }

  // Можно добавить методы для вывода уведомлений
  public showToast() {
    // Логика для отображения тоста (например, с использованием библиотеки уведомлений)
    console.log(`Тост: ${this.message}`)
  }
}
