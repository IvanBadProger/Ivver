import React, { useId } from "react"
import clsx from "clsx"

export interface FieldContainerProps {
  label: string
  isLabelHidden?: boolean
  errorMessage?: string
}

interface FieldProps {
  id?: string
  required?: boolean
  "aria-invalid"?: React.AriaAttributes["aria-invalid"]
  "aria-describedby"?: React.AriaAttributes["aria-describedby"]
}

export const withFieldContainer = <P extends FieldProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function WithFieldContainer(
    props: Omit<P, keyof FieldContainerProps> & FieldContainerProps
  ) {
    const { label, errorMessage, required, isLabelHidden, ...rest } =
      props

    const inputId = useId()
    const errorId = useId()
    const hintId = useId()

    return (
      <div>
        {label && (
          <label
            className={clsx(
              "mb-1 block text-sm font-medium text-gray-700",
              {
                "after:ml-0.5 after:text-red-500 after:content-['*']":
                  required,
                "sr-only": isLabelHidden,
              }
            )}
            htmlFor={inputId}
          >
            {label}
          </label>
        )}
        <WrappedComponent
          id={inputId}
          required={required}
          aria-invalid={!!errorMessage}
          aria-describedby={hintId}
          {...(rest as unknown as P)}
        />
        {errorMessage && (
          <span
            className="mt-1 text-sm text-red-500"
            id={errorId}
            aria-live="assertive"
          >
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
}
