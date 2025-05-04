import { ClientSidebar } from "@/components/ClientSidebar"
import { getProducts, ProductList } from "@/components/Product"
import { Slider } from "@/widgets/Slider/Slider"

const slides = [
  "https://images.unsplash.com/photo-1746240922260-efbea47dc532?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1745597797513-1ed1bbde4060?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1745827216178-96fb0c6a355a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export default async function Home() {
  const products = await getProducts()

  return (
    <section className="relative container mx-auto flex gap-x-4 ">
      <ClientSidebar />
      <ProductList className="shrink grow" products={products} />
      {/* <Slider slides={slides} ariaLabel="Featured Images Slider" /> */}
    </section>
  )
}
