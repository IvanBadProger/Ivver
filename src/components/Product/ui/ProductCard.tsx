import skeletonPhoto from "@/assets/no-photo-612x612.jpg"
import { WithId } from "@/shared/types"
import { Badge, Title } from "@/shared/ui"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { ProductDTO } from "../types"

type ProductCardProps = WithId<ProductDTO> & { className?: string }

export const ProductCard = (props: ProductCardProps) => {
  const { id, category, name, price, preview_photo_url, className } = props

  return (
    <article
      className={clsx(
        "group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all w-full hover:shadow-2xl cursor-pointer duration-200",
        className
      )}
    >
      <Link href={`/product/${id}`} className="flex flex-col gap-y-2 items-between h-full p-4">
        <div className="relative mb-2 aspect-square overflow-hidden rounded-xl">
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            src={preview_photo_url ? preview_photo_url : skeletonPhoto}
            alt=""
            fill
            priority={true}
            // placeholder="blur" QnA: это вместо скелетона?
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <Badge text={category?.name} className="max-w-full w-fit" />

        <Title size="md" className="text-gray-900 line-clamp-3 hyphens-auto min-h-12 shrink grow">
          {name}
        </Title>

        <span className="text-md md:text-xl truncate font-bold text-primary-600">{price} руб</span>
      </Link>
    </article>
  )
}
