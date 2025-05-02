import { ProductCard } from "./ProductCard"
import { Product } from "../types"

type ProductListProps = {
  products: Product[]
}

export const ProductList = (props: ProductListProps) => {
  const { products } = props

  return (
    // не рабоатет класс
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {products.map(({ id, ...product }) => (
        <ProductCard key={id} {...product} />
      ))}
    </div>
  )
}
