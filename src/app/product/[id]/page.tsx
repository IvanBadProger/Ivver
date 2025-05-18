import { getProductById } from "@/components/Product/api"
import { Badge, Title } from "@/shared/ui"
import { Loading, Slider } from "@/widgets"
import { Metadata } from "next"
import Image from "next/image"
import { Suspense } from "react"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  return {
    title: `${product.name} `,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.photos?.filter((img) => img.is_preview),
    },
  }
}

export default async function Page(props: PageProps) {
  const { params } = props
  const { id: productId } = await params
  const {
    category,
    description,
    id,
    photos: images,
    name,
    price,
    measurement_unit: unit,
  } = await getProductById(productId)

  return (
    <section className="container mx-auto py-8 px-4">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Suspense fallback={<Loading />}>
          {images?.length ? (
            <Slider>
              {images.map((img, index) => (
                <Image
                  key={index}
                  src={img.url}
                  alt={`Слайд ${index + 1} из ${images.length}`}
                  className="w-full h-full object"
                  width={300}
                  height={300}
                  priority={index === 0}
                />
              ))}
            </Slider>
          ) : (
            <p>Нет фото продукта</p>
          )}
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
            {description ? description : "Здесь нет описания"}
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

            <div className="flex items-center justify-between text-sm">
              <dt className="text-gray-500">Артикул:</dt>
              <dd className="font-mono">{id}</dd>
            </div>
          </dl>
        </div>
      </article>
    </section>
  )
}
