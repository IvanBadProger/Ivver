import { Badge, Title } from "@/shared/ui"
import { ProductDTO } from "../types"
import Image from "next/image"
import Link from "next/link"
import skeletonPhoto from "@/assets/no-photo-612x612.jpg"
import { WithId } from "@/shared/types"
import clsx from "clsx"

type ProductCardProps = WithId<ProductDTO> & { className?: string }

export const ProductCard = (props: ProductCardProps) => {
  const { id, category, name, price, preview_photo_url, className } =
    props

  return (
    <article
      className={clsx(
        "group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all w-full hover:shadow-xl cursor-pointer",
        className
      )}
    >
      <Link
        href={`/product/${id}`}
        className="flex flex-col gap-y-2 items-between h-full p-4"
      >
        <div className="relative mb-2 aspect-square overflow-hidden rounded-xl">
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

        <Badge text={category?.name} className="max-w-full w-fit" />

        <Title
          size="lg"
          className="text-gray-900 overflow-hidden line-clamp-4 max-h-[150px] shrink grow"
        >
          {name}
        </Title>

        <span className="text-xl font-bold text-primary-600">
          {price} руб
        </span>
      </Link>
    </article>
  )
}
