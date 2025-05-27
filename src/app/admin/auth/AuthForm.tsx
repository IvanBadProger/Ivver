"use client"
import { login } from "@/components/Admin/api"
import { Button, Form, Input } from "@/shared/ui"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import { z } from "zod"

export const AuthSchema = z.object({
  login: z.string().nonempty("Это поле обязательно"),
  password: z.string().nonempty("Это поле обязательно"),
})

export type AuthData = z.infer<typeof AuthSchema>

export function AuthForm() {
  const router = useRouter()

  const onAuth = async (data: AuthData) => {
    const message = await login(data)

    toast(message)
    router.push("/admin/dashboard")
  }

  return (
    <>
      <Form isReset={false} onSubmit={onAuth} schema={AuthSchema}>
        <Input label="Логин" name="login" autoComplete="email" />
        <Input
          label="Пароль"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit">Войти</Button>
      </Form>

      <ToastContainer
        position="top-center"
        pauseOnHover={false}
        autoClose={3000}
      />
    </>
  )
}
