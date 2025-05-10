import { ClientSidebar } from "@/components/ClientSidebar"
import { getProducts, ProductList } from "@/components/Product"

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
      <ClientSidebar activeCategory={category} />
      <ProductList className="shrink grow" products={products} />
    </section>
  )
}
