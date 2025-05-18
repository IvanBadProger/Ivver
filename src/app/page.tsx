import { getProducts, ProductList } from "@/components/Product"
import { ClientSidebar } from "@/components/ClientSidebar"
import { Suspense } from "react"
import { Loading } from "@/widgets"

type Props = {
  searchParams: Promise<{ category: string }>
}

export default async function Home({ searchParams }: Props) {
  const { category = "all" } = await searchParams
  const products = await getProducts(
    category === "all" ? undefined : category
  )

  return (
    <section className="relative container mx-auto flex gap-x-4 ">
      <Suspense fallback={<Loading />}>
        <ClientSidebar activeCategory={category} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ProductList className="shrink grow" products={products} />
      </Suspense>
    </section>
  )
}
