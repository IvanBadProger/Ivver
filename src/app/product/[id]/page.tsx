import { getProductById } from "@/components/Product/api"
import { Badge, Title } from "@/shared/ui"
import { Slider } from "@/widgets"
import { Metadata } from "next"

type PageProps = {
  params: Promise<{ id: string }>
}

const imagesDef = [
  "https://images.unsplash.com/photo-1733507267128-e65b38dad170?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1745949779026-f7fdd1470f8c?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1746102268391-a17760aff398?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  return {
    title: `${product.name} | Магазин`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  }
}

export default async function Page(props: PageProps) {
  const { params } = props
  const { id: productId } = await params
  const {
    category_id: category,
    description,
    id,
    images = imagesDef,
    name,
    price,
    measurement_unit_id: unit,
  } = await getProductById(productId)

  return (
    <section className="container mx-auto py-8 px-4">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Slider
          ariaLabel="Галерея изображений продукта"
          slides={images}
        />

        {/* Информация о продукте */}
        <div className="space-y-6">
          <header className="space-y-3">
            <Title size="2xl" className="text-primary-900">
              {name}
            </Title>
            <Badge
              text={category}
              className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
            />
          </header>

          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>

          <dl className="space-y-2 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-gray-500">Единица измерения:</dt>
              <dd className="font-medium text-gray-900">{unit}</dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-500">Цена:</dt>
              <dd className="text-xl font-bold text-secondary-600">
                <span>{price}</span>
                <span content="RUB">&nbsp;₽</span>
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
