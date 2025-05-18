import { Badge, Title } from "@/shared/ui"
import { ProductDTO } from "../types"
import Image from "next/image"
import Link from "next/link"
import skeletonPhoto from "@/assets/no-photo-612x612.jpg"
import { WithId } from "@/shared/types"

type ProductCardProps = WithId<ProductDTO>

export const ProductCard = (props: ProductCardProps) => {
  const { id, category, name, price, preview_photo_url } = props

  return (
    <article className="group relative overflow-hidden rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-xl max-w-[30vw] cursor-pointer">
      <Link href={`/product/${id}`}>
        <div className="relative mb-4 aspect-square overflow-hidden rounded-xl">
          {preview_photo_url ? (
            <Image
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              src={preview_photo_url}
              alt=""
              fill
              priority={true}
              // placeholder="blur" QnA: это вместо скелетона?
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Image
              src={skeletonPhoto}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>

        <Badge text={category?.name} className="mb-2" />

        <Title size="lg" className="my-2 text-gray-900 line-clamp-4">
          {name}
        </Title>

        <span className="text-xl font-bold text-primary-600">
          {price} руб
        </span>
      </Link>
    </article>
  )
}
