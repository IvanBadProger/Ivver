import { useId } from "react"
import { Upload } from "lucide-react"
import clsx from "clsx"

type FileInputProps = { className?: string }

export const FileInput = (props: FileInputProps) => {
  const { className } = props

  const InputId = useId()
  // fix: доработать компонент
  return (
    <div className={clsx("mx-auto max-w-xs", className)}>
      <label
        htmlFor={InputId}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Upload file
      </label>
      <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
        <div className="space-y-1 text-center">
          <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Upload />
          </div>
          <div className="text-gray-600">
            <span className="font-medium text-primary-500 hover:text-primary-700">
              Click to upload
            </span>
            <br />
            or drag and drop
          </div>
          <p className="text-sm text-gray-500">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
        <input id={InputId} type="file" className="sr-only" />
      </label>
    </div>
  )
}
