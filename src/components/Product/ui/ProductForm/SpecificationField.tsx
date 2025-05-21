import { UseFormRegister } from "react-hook-form"
import { ProductFormAdd } from "./types"
import { Button, Input } from "@/shared/ui"
import { Trash } from "lucide-react"

type SpecificationFieldProps = {
  register: UseFormRegister<ProductFormAdd>
  index: number
  errorMessage?: string
  onRemove: (index: number) => void
}

export const SpecificationField = ({
  register,
  index,
  errorMessage,
  onRemove,
}: SpecificationFieldProps) => {
  return (
    <div className="flex gap-x-4">
      <Input
        label="Имя характеристики"
        {...register(`specifications.${index}.name`)}
        errorMessage={errorMessage}
      />
      <Input
        label="Значение"
        {...register(`specifications.${index}.value`)}
      />
      <Button mode="danger" onClick={() => onRemove(index)}>
        <Trash />
      </Button>
    </div>
  )
}
