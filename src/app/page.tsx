import { getProducts, ProductList } from "@/components/Product"
import { ClientSidebar } from "@/components/ClientSidebar"
import { Suspense } from "react"
import { Loading } from "@/widgets"
import { ProductsPagination } from "@/components/Product/ui/ProductsPagination"

type Props = {
  searchParams: Promise<{ category: string; page: string }>
}

export default async function Home({ searchParams }: Props) {
  const { category = "all", page = "1" } = await searchParams
  const { data: products, ...paginator } = await getProducts(
    category,
    page
  )

  return (
    <section className="relative container mx-auto px-4 flex gap-x-4 ">
      <Suspense fallback={<Loading />}>
        <ClientSidebar activeCategory={category} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <div className="w-full flex flex-col gap-y-8">
          <ProductList className="shrink grow" products={products} />
          {!!products.length && paginator.last_page !== 1 && (
            <ProductsPagination
              {...paginator}
              category={category}
              baseUrl="/"
            />
          )}
        </div>
      </Suspense>
    </section>
  )
}
