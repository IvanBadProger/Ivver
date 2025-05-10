import { ProductCard } from "./ProductCard"
import { Product } from "../types"
import clsx from "clsx"
import { WithId } from "@/components/Category/types"

type ProductListProps = {
  products: WithId<Product>[]
  className?: string
}

export const ProductList = (props: ProductListProps) => {
  const { products, className } = props

  return (
    <div
      className={clsx(
        "grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
