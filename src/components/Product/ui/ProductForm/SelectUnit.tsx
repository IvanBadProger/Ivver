import { Select } from "@/shared/ui"
import { useEffect, useState } from "react"
import { getMeasurementUnits } from "../../api"
import { MeasurementUnitDTO } from "../../types"

type SelectUnitProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    errorMessage?: string
  }

export const SelectUnit = (props: SelectUnitProps) => {
  const [units, setUnits] = useState<MeasurementUnitDTO[]>([])
  useEffect(() => {
    getMeasurementUnits().then((res) => setUnits(res))
  }, [])

  const opts = units.map(({ name, id }) => {
    return { name, value: id }
  })

  return (
    <Select
      label="Выберите единицу измерения"
      options={opts}
      {...props}
    />
  )
}
