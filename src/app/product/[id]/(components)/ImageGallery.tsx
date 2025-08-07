// ImagesGallery.tsx
import noImage from "@/assets/no-photo-612x612.jpg"
import { ProductPhoto } from "@/components/Product/types"
import { Slider } from "@/widgets"
import Image from "next/image"

export const ImagesGallery = ({
  images,
  className,
}: {
  images?: ProductPhoto[]
  className?: string
}) => {
  if (images?.length) {
    const sortedImages = images.toSorted((a, b) => (b.is_preview ? 1 : 0) - (a.is_preview ? 1 : 0))

    return (
      <div className={className}>
        <Slider>
          {sortedImages.map((img, index) => (
            <div key={img.id} className="relative w-full aspect-square md:aspect-video">
              <Image
                className="object-contain"
                src={img.url}
                alt={`Изображение товара ${index + 1} из ${images.length}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  } else {
    return (
      <div className={className}>
        <div className="relative w-full aspect-square md:aspect-video">
          <Image className="object-contain" src={noImage} alt="У товара нет изображений" fill />
        </div>
      </div>
    )
  }
}
