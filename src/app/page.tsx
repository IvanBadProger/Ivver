import { CategoryMenu, getCategories } from "@/components/Category"
import { getProducts, ProductList } from "@/components/Product"
import { ProductsPagination } from "@/components/Product/ui/ProductsPagination"
import { Loading, Sidebar } from "@/widgets"
import { Suspense } from "react"

type Props = {
  searchParams: Promise<{ category: string; page: string }>
}

export default async function Home({ searchParams }: Props) {
  const { category = "all", page = "1" } = await searchParams
  const { data: products, ...paginator } = await getProducts(category, page)
  const categories = await getCategories()

  return (
    <section className="relative container mx-auto px-4 flex flex-col gap-x-4 gap-y-8 md:flex-row">
      <Suspense fallback={<Loading />}>
        <Sidebar title="Категории">
          <CategoryMenu categories={categories} activeCategory={category} />
        </Sidebar>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <div className="w-full flex flex-col gap-y-8">
          <ProductList className="shrink grow" products={products} />
          {!!products.length && paginator.last_page !== 1 && (
            <ProductsPagination {...paginator} category={category} baseUrl="/" />
          )}
        </div>
      </Suspense>
    </section>
  )
}
