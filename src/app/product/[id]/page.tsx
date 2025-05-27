import { getProductById } from "@/components/Product/api"
import { Badge, Title } from "@/shared/ui"
import { Loading, Slider } from "@/widgets"
import { Metadata } from "next"
import Image from "next/image"
import { Suspense } from "react"
import noImage from "@/assets/no-photo-612x612.jpg"
import {
  ProductPhoto,
  Specification,
} from "@/components/Product/types"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) return {}

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.photos?.filter((img) => img.is_preview),
      locale: "ru_RU",
    },
    alternates: {
      canonical: `/products/${product.id}`,
    },
  }
}

export default async function ProductPage(props: PageProps) {
  const { params } = props
  const { id: productId } = await params
  const product = await getProductById(productId)

  if (!product)
    return <div>Ошибка при получении информации о продукте</div>

  const {
    category,
    description,
    photos: images,
    name,
    price,
    measurement_unit: unit,
    specifications,
  } = product

  return (
    <section className="container mx-auto py-8 px-4">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Suspense fallback={<Loading />}>
          <ImagesGallery images={images} />
        </Suspense>

        {/* Информация о продукте */}
        <div className="space-y-6">
          <header className="space-y-3">
            <Title size="2xl" className="text-primary-900">
              {name}
            </Title>
            <Badge
              text={category.name}
              className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
            />
          </header>

          <p className="text-gray-600 leading-relaxed">
            {description
              ? description
              : "У этого товара нет описания"}
          </p>

          <dl className="space-y-2 border-t border-gray-300 pt-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-500">Цена:</dt>
              <dd className="text-xl font-bold text-secondary-600">
                <span>{price}</span>
                <span content="RUB">&nbsp;₽</span>
                {unit && <span>&nbsp;/ {unit.name}</span>}
              </dd>
            </div>
          </dl>

          {!!specifications?.length && (
            <ProductSpecifications specifications={specifications} />
          )}
        </div>
      </article>
    </section>
  )
}

const ImagesGallery = ({ images }: { images?: ProductPhoto[] }) => {
  if (images?.length) {
    const sortedImages = images.toSorted(
      (a, b) => (b.is_preview ? 1 : 0) - (a.is_preview ? 1 : 0)
    )

    return (
      <Slider>
        {sortedImages.map((img, index) => (
          <Image
            key={img.id}
            src={img.url}
            alt={`Изображение товара ${index + 1} из ${
              images.length
            }`}
            className="w-full h-full object-cover"
            width={600}
            height={600}
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading={index === 0 ? "eager" : "lazy"}
            // placeholder="blur"
            // blurDataURL={img.blurHash}
          />
        ))}
      </Slider>
    )
  } else {
    return (
      <Image
        src={noImage}
        alt="У товара нет изображений"
        width={300}
        height={300}
        className="w-full h-full object"
      />
    )
  }
}

const ProductSpecifications = ({
  specifications,
}: {
  specifications?: Specification[]
}) => (
  <>
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
  </>
)
