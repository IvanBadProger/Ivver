"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { ReactElement } from "react"
import { z, ZodSchema } from "zod"
import { FieldContainerProps } from "../HOC/withFieldContainer"
import { useForm } from "react-hook-form"

// fix: типизацию поправить так чтобы: не возникло других проблем с типизацией, убрать все any, в data, defaultValues были только поля из schema. Убрать костыли и соответствоввать солид и чистому коду
interface FormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  schema: ZodSchema
  onSubmit: (data: any) => void
  children: FormFieldElement[] | FormFieldElement
  defaultValues?: Record<string, any>
  heading?: string
}

interface FormFieldElement extends ReactElement {
  props: {
    name?: string
    [key: string]: any
  } & FieldContainerProps
}

export const Form = (props: FormProps) => {
  const {
    heading,
    schema,
    children,
    onSubmit,
    defaultValues,
    ...rest
  } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  })

  if (defaultValues) {
    Object.entries(defaultValues).forEach((entry) => {
      setValue(entry["0"], entry["1"])
    })
  }

  return (
    <form
      className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md "
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      <fieldset className="flex flex-col gap-y-4">
        <legend className="text-xl mb-8 text-gray-900 text-center">
          {heading}
        </legend>
        {React.Children.map(children, (child: FormFieldElement) => {
          const name = child.props.name
          return name
            ? React.createElement(child.type, {
                ...child.props,
                ...register(name),
                key: name,
                errorMessage: errors[name]?.message,
              })
            : child
        })}
      </fieldset>
    </form>
  )
}
