import { getProductById } from "@/components/Product/api"
import { Loading } from "@/widgets"
import { Metadata } from "next"
import { Suspense } from "react"
import {
  ImagesGallery,
  ProductInfo,
  ProductSpecifications,
} from "./(components)"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) return {}
  const { name, description, photos } = product

  return {
    title: name,
    description: description ?? "",

    openGraph: {
      title: name,
      description: description,
      images: [
        {
          url:
            photos?.filter((img) => img.is_preview)[0]?.url ??
            "https://ivver.ru/logo.svg",
          width: 200,
          height: 200,
          alt: "",
        },
      ],

      url: `https://ivver.ru/products/${id}`,
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
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
    specifications,
  } = product

  return (
    <section
      className="container mx-auto py-8 px-4"
      aria-labelledby={productId}
    >
      <article className="min-h-screen grid grid-cols-2 gap-4">
        <Suspense fallback={<Loading />}>
          <ImagesGallery
            images={images}
            className="w-full max-h-[75vh]"
          />
        </Suspense>

        <ProductInfo
          description={description}
          id={productId}
          name={name}
          category={category}
          price={price}
        />

        {!!specifications?.length && (
          <ProductSpecifications
            className="col-span-2"
            specifications={specifications}
          />
        )}
      </article>
    </section>
  )
}
