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
import { ProductTableContainer } from "./ui/ProductTableContainer"

export {
  ProductDTOSchema,
  ProductSchema,
  ProductCard,
  getProducts,
  ProductList,
  ProductTable,
  ButtonCreateProduct,
  ProductTableContainer,
}
export type { Product, ProductDTO }
