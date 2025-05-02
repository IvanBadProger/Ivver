import { Category } from "./types"

export const getCategories = async (): Promise<Category[]> => {
  return [
    {
      id: "1",
      created_at: "29:03",
      updated_at: "50:43",
      name: "category-1",
    },
    {
      id: "2",
      created_at: "29:03",
      updated_at: "50:43",
      name: "category-2",
    },
    {
      id: "3",
      created_at: "29:03",
      updated_at: "50:43",
      name: "category-3",
    },
    {
      id: "4",
      created_at: "29:03",
      updated_at: "50:43",
      name: "category-4",
    },
  ]
}
