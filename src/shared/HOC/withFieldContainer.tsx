import { useId } from "react"
import clsx from "clsx"

export type FieldContainerProps = {
  label: string
  isLabelHidden?: boolean
  errorMessage?: string
  wrapperClassName?: string
}

type FieldProps = {
  id?: string
  required?: boolean
  "aria-invalid"?: React.AriaAttributes["aria-invalid"]
  "aria-describedby"?: React.AriaAttributes["aria-describedby"]
}

type withFieldContainerProps<P> = Omit<P, keyof FieldContainerProps> &
  FieldContainerProps

export const withFieldContainer = <P extends FieldProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function WithFieldContainer(
    props: withFieldContainerProps<P>
  ) {
    const {
      label,
      errorMessage,
      required,
      isLabelHidden,
      wrapperClassName,
      ...rest
    } = props

    const inputId = useId()
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    return (
      <div className={wrapperClassName}>
        {label && (
          <label
            className={clsx(
              "mb-2 block text-sm font-medium text-gray-700 select-none",
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
