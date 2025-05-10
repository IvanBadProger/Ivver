"use client"
import { Button, Form, Input } from "@/shared/ui"
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
      console.log("Успех")
    } else {
      console.log("Не успех")
    }
  }

  return (
    <Form onSubmit={onAuth} schema={AuthSchema}>
      <Input label="Логин" name="login" />
      <Input label="Пароль" name="password" type="password" />
      <Button type="submit">Войти</Button>
    </Form>
  )
}
