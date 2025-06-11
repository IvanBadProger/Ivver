"use client"
import { login } from "@/components/Admin/api"
import { Button, Form, Input } from "@/shared/ui"
import { toast } from "react-toastify"
import { AuthData, AuthSchema } from "./AuthSchema"
import { MAIN_TOAST_CONTAINER_ID, ROUTES } from "@/shared/constants"
import { useRouter } from "next/navigation"

export function AuthForm() {
  const router = useRouter()

  const onAuth = async (data: AuthData) => {
    const { message, isSuccess } = await login(data)

    toast(message, { containerId: MAIN_TOAST_CONTAINER_ID })

    if (isSuccess) router.push(ROUTES.DASHBOARD)
  }

  return (
    <Form isReset={false} onSubmit={onAuth} schema={AuthSchema}>
      <Input
        required
        label="Логин"
        name="login"
        autoComplete="username"
      />
      <Input
        required
        label="Пароль"
        name="password"
        type="password"
        autoComplete="current-password"
      />
      <Button type="submit">Войти</Button>
    </Form>
  )
}
