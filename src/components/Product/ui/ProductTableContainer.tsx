import { getProducts } from "../api"
import { ProductsPagination } from "./ProductsPagination"
import { ProductTable } from "./ProductTable"

export const ProductTableContainer = async ({
  page,
}: {
  page: string
}) => {
  const { data: products, ...paginator } = await getProducts("", page)

  return (
    <>
      <ProductTable products={products} />
      <ProductsPagination
        {...paginator}
        category=""
        baseUrl="/admin/dashboard"
      />
    </>
  )
}
