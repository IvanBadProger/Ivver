import { getProducts } from "../api"
import { ProductTable } from "./ProductTable"

export const ProductTableContainer = async () => {
  const products = await getProducts("", true)

  return <ProductTable products={products} />
}
