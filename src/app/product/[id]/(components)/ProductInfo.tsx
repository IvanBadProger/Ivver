import { Title } from "@/shared/ui"
import { Product } from "@/components/Product"
import clsx from "clsx"
import Link from "next/link"

type ProductInfoProps = Pick<
  Product,
  "id" | "category" | "description" | "name" | "price"
> & {
  className?: string
}

export const ProductInfo = (props: ProductInfoProps) => {
  const { category, id, name, price, description, className } = props

  return (
    <div className={clsx("space-y-6", className)}>
      <header className="space-y-3">
        <Title
          size="2xl"
          className="text-primary-900 hyphens-auto"
          id={id}
        >
          {name}
        </Title>
        <Link
          href={`/?category=${category.id}`}
          title={`Перейти к товарам категории ${category.name}`}
          className="bg-primary-100 px-4 py-2 rounded-full cursor-pointer text-sm transition-colors text-primary-600 truncate block max-w-fit hover:bg-primary-200"
        >
          {category.name}
        </Link>
      </header>

      <p className="text-gray-600 leading-relaxed hyphens-auto">
        {description ? description : "У этого товара нет описания"}
      </p>

      <div className="text-xl text-right font-bold text-secondary-600">
        <span>{price}</span>
        <span>&nbsp;₽</span>
      </div>
    </div>
  )
}
