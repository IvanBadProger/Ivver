import { Select } from "@/shared/ui"
import { getCategories } from "../api"

export const CategorySelect = async () => {
  const categories = await getCategories()
  const opts = categories.map(({ name, id }) => {
    return { name, value: id }
  })

  return <Select label="Выберите категорию" options={opts} />
}
