import { getCategories } from "../api"
import { CategoryTable } from "./CategoryTable"

export const CategoriesTableContainer = async () => {
  const categories = await getCategories(true)

  return <CategoryTable categories={categories} />
}
