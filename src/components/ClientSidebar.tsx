import { CategoryMenu, getCategories } from "@/components/Category"
import { Sidebar } from "@/widgets"

type Props = {
  activeCategory: string
}

export const ClientSidebar = async ({ activeCategory }: Props) => {
  const categories = await getCategories()

  return (
    <Sidebar title="Категории">
      <CategoryMenu
        categories={categories}
        activeCategory={activeCategory}
      />
    </Sidebar>
  )
}
