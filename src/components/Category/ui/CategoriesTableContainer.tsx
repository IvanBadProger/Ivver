import { getCategories } from "../api"
import { CategoryTable } from "./CategoryTable"

export const CategoriesTableContainer = async () => {
  const categories = await getCategories()

  return <CategoryTable categories={categories} />
}
