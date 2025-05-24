"use client"
import { Button, Form, Input } from "@/shared/ui"
import { toast, ToastContainer } from "react-toastify"
import { z } from "zod"

export const AuthSchema = z.object({
  login: z.string().nonempty(),
  password: z.string().nonempty(),
})

export type AuthData = z.infer<typeof AuthSchema>

export function AuthForm() {
  const onAuth = async (data: AuthData) => {
    const { password, login } = data

    if (password === "admin" && login === "admin") {
      toast.success("Успех")
    } else {
      toast.error("Не успех")
    }
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
      <ToastContainer position="top-center" />
    </>
  )
}
