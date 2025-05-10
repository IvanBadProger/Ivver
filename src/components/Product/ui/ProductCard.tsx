import { Badge, Title } from "@/shared/ui"
import { ProductDTO } from "../types"
import Image from "next/image"
import Link from "next/link"
import { WithId } from "@/components/Category/types"

type ProductCardProps = WithId<ProductDTO>

export const ProductCard = (props: ProductCardProps) => {
  const { id, category, description, name, price, images } = props

  return (
    <article className="group relative overflow-hidden rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-xl max-w-[30vw] cursor-pointer">
      <Link href={`/product/${id}`}>
        <div className="relative mb-4 aspect-square overflow-hidden rounded-xl">
          {images?.map((img, index) => (
            <Image
              key={index}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              src={img}
              alt=""
              fill
              priority={true}
              // placeholder="blur" QnA: это вместо скелетона?
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ))}
        </div>

        <Badge text={category?.name} className="mb-2" />

        <Title size="lg" className="my-2 text-gray-900 line-clamp-4">
          {name}
        </Title>

        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        <span className="text-xl font-bold text-primary-600">
          {price} руб
        </span>
      </Link>
    </article>
  )
}
