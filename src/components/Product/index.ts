import { getProducts } from "./api"
import { ButtonCreateProduct } from "./ui/ButtonCreateProduct"
import { ProductCard } from "./ui/ProductCard"
import { ProductList } from "./ui/ProductList"
import { ProductTable } from "./ui/ProductTable"
import {
  ProductDTOSchema,
  ProductSchema,
  Product,
  ProductDTO,
} from "./types"

export {
  ProductDTOSchema as ProductFormSchema,
  ProductSchema,
  ProductCard,
  getProducts,
  ProductList,
  ProductTable,
  ButtonCreateProduct,
}
export type { Product, ProductDTO }
