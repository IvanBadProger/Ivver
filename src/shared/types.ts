import { ProductDTO } from "@/components/Product"

export type WithId<T> = T & { id: string }

type PaginationLink = {
  url?: string | null
  label: string
  active: boolean
}
export type Paginator = {
  current_page: number
  data: ProductDTO[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url?: string | null
  path: string
  per_page: number
  prev_page_url?: string | null
  to: number
  total: number
}
