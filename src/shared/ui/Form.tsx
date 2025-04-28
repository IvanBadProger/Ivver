"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import React, { ReactElement } from "react"
import { z, ZodSchema } from "zod"
import { FieldContainerProps } from "../HOC/withFieldContainer"
import { useForm } from "react-hook-form"

// fix: типизацию поправить
interface FormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  schema: ZodSchema
  onSubmit: (data: any) => void
  children: FormFieldElement[] | FormFieldElement
  defaultValues?: Record<string, any>
}

interface FormFieldElement extends ReactElement {
  props: {
    name?: string
    [key: string]: any
  } & FieldContainerProps
}

export const Form = (props: FormProps) => {
  const { schema, children, onSubmit, defaultValues, ...rest } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  })

  return (
    <form
      className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded-lg shadow-md flex flex-col gap-y-4"
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      {React.Children.map(children, (child: FormFieldElement) => {
        const name = child.props.name
        return name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                ...register(name),
                key: name,
                errorMessage: errors[name]?.message,
              },
            })
          : child
      })}
    </form>
  )
}
