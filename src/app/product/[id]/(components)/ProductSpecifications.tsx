import { Specification } from "@/components/Product/types"
import { Title } from "@/shared/ui"

export const ProductSpecifications = ({
  specifications,
  className,
}: {
  specifications?: Specification[]
  className?: string
}) => (
  <div className={className}>
    <Title size="lg" tagName="h2" className="mb-2">
      Характеристики
    </Title>

    <dl className="space-y-2 border-t border-gray-300 pt-4">
      {specifications?.map(({ id, name, value }) => (
        <div
          className="flex items-center justify-between text-sm"
          key={id}
        >
          <dt className="text-gray-700">{name}</dt>
          <dd className="font-mono">{value}</dd>
        </div>
      ))}
    </dl>
  </div>
)
