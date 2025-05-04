import { ProductCard } from "./ProductCard"
import { Product } from "../types"
import clsx from "clsx"

type ProductListProps = {
  products: Product[]
  className?: string
}

export const ProductList = (props: ProductListProps) => {
  const { products, className } = props

  return (
    // не рабоатет класс
    <div
      className={clsx(
        "grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4",
        className
      )}
    >
      {products.map(({ id, ...product }) => (
        <ProductCard key={id} {...product} />
      ))}
    </div>
  )
}
