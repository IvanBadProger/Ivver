import { ProductPhoto } from "@/components/Product/types"
import { Slider } from "@/widgets"
import Image from "next/image"
import noImage from "@/assets/no-photo-612x612.jpg"

export const ImagesGallery = ({
  images,
  className,
}: {
  images?: ProductPhoto[]
  className?: string
}) => {
  if (images?.length) {
    const sortedImages = images.toSorted(
      (a, b) => (b.is_preview ? 1 : 0) - (a.is_preview ? 1 : 0)
    )

    return (
      <Slider className={className}>
        {sortedImages.map((img, index) => (
          <Image
            className="object-contain w-full"
            key={img.id}
            src={img.url}
            alt={`Изображение товара ${index + 1} из ${
              images.length
            }`}
            width={400}
            height={400}
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </Slider>
    )
  } else {
    return (
      <Image
        className={className}
        src={noImage}
        alt="У товара нет изображений"
        width={400}
        height={400}
        // fill
      />
    )
  }
}
