"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { TypeOf, z, ZodSchema } from "zod"
import { Path, useForm } from "react-hook-form"
import React, { forwardRef } from "react"

interface FormProps<TSchema extends ZodSchema>
  extends React.FormHTMLAttributes<HTMLFormElement> {
  schema: TSchema
  onSubmit: (data: z.TypeOf<TSchema>) => void
  children: React.ReactElement[]
  updatedValues?: z.TypeOf<TSchema>
  defaultValues?: z.TypeOf<TSchema>
  heading?: string
  isReset?: boolean
}

export const Form = forwardRef(function Form<
  TSchema extends ZodSchema
>(
  props: FormProps<TSchema>,
  ref: React.Ref<HTMLFormElement> | undefined
) {
  const {
    heading,
    schema,
    children,
    onSubmit,
    updatedValues,
    defaultValues,
    isReset = true,
    ...rest
  } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<z.TypeOf<TSchema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues,
  })

  if (updatedValues) {
    for (const field in updatedValues) {
      setValue(field as typeof updatedValues, updatedValues[field])
    }
  }

  return (
    <form
      ref={ref}
      className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md"
      onSubmit={handleSubmit((data) => {
        onSubmit(data)
        if (isReset) {
          reset()
        }
      })}
      {...rest}
    >
      <fieldset className="flex flex-col gap-y-4">
        <legend className="text-xl mb-8 text-gray-900 text-center">
          {heading}
        </legend>
        {React.Children.map(children, (child) => {
          const name =
            (child?.props as { name?: Path<TypeOf<TSchema>> }).name ??
            ""
          return name
            ? React.createElement(child.type, {
                ...(child.props ?? {}),
                ...register(name),
                key: name,
                errorMessage: errors[name]?.message,
              })
            : child
        })}
      </fieldset>
    </form>
  )
})
