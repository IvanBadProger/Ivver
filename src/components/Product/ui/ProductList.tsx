import { ProductCard } from "./ProductCard"
import { ProductDTO } from "../types"
import clsx from "clsx"
import { WithId } from "@/shared/types"

type ProductListProps = {
  products: WithId<ProductDTO>[]
  className?: string
}

export const ProductList = (props: ProductListProps) => {
  const { products, className } = props

  if (!products.length) {
    return <p className="text-center">Товаров нет</p>
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4",
        className
      )}
    >
      {products.map(
        ({ name, category, price, id, preview_photo_url }) => {
          return (
            <ProductCard
              key={id}
              category_id={category.id}
              name={name}
              category={category}
              price={price}
              preview_photo_url={preview_photo_url}
              id={id}
            />
          )
        }
      )}
    </div>
  )
}
