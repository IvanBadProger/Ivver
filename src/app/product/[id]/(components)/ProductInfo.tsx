import { Badge, Title } from "@/shared/ui"
import { Product } from "@/components/Product"
import clsx from "clsx"

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
        <Title size="2xl" className="text-primary-900" id={id}>
          {name}
        </Title>
        <Badge
          text={category.name}
          className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
        />
      </header>

      <p className="text-gray-600 leading-relaxed hyphens-auto">
        {description ? description : "У этого товара нет описания"}
      </p>

      <div className="text-xl text-right font-bold text-secondary-600">
        <span>{price}</span>
        <span content="RUB">&nbsp;₽</span>
      </div>
    </div>
  )
}
