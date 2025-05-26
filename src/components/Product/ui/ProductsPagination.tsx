import { Paginator } from "@/shared/types"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import clsx from "clsx"

type ProductsPaginationProps = Omit<Paginator, "data"> & {
  category?: string
  /**
   * Базовый URL
   * @example /catalog
   */
  baseUrl: string
}

enum LABELS {
  prevPage = "Предыдущая страница",
  nextPage = "Следующая страница",
  firstPage = "Первая страница",
  lastPage = "Последняя страница",
}

export const ProductsPagination = async (
  props: ProductsPaginationProps
) => {
  const {
    current_page,
    last_page,
    total,
    next_page_url,
    prev_page_url,
    category,
    baseUrl,
  } = props

  const generateHref = (page: number) => {
    const params = new URLSearchParams({
      page: page.toString(),
    })

    const hasCategory = category
    if (hasCategory) {
      params.append("category", category)
    }

    return `${baseUrl}?${params.toString()}`
  }

  const isDisabled = (page: number) => current_page === page

  return (
    <div className="flex flex-col gap-y-1 items-center">
      <div className="flex items-center gap-x-2">
        {prev_page_url && (
          <PageButton
            href={generateHref(current_page - 1)}
            label={LABELS.prevPage}
            isDisabled={isDisabled(current_page - 1)}
          >
            <ArrowLeft />
          </PageButton>
        )}

        <PageButton
          href={generateHref(1)}
          label={LABELS.firstPage}
          isDisabled={isDisabled(1)}
        >
          1
        </PageButton>

        <span className="text-secondary-700 mx-5">
          {current_page}
        </span>

        <PageButton
          href={generateHref(last_page)}
          label={LABELS.lastPage}
          isDisabled={isDisabled(last_page)}
        >
          {last_page}
        </PageButton>

        {next_page_url && (
          <PageButton
            href={generateHref(current_page + 1)}
            label={LABELS.nextPage}
            isDisabled={isDisabled(current_page + 1)}
          >
            <ArrowRight />
          </PageButton>
        )}
      </div>

      <span className="text-primary-400 text-sm">
        Товаров: {total}
      </span>
    </div>
  )
}

interface PageButtonProps extends React.PropsWithChildren {
  href: string
  isDisabled?: boolean
  label?: string
}

const PageButton = ({
  children,
  href,
  isDisabled = false,
  label,
}: PageButtonProps) => {
  return (
    <Link
      href={href}
      title={label}
      aria-label={label}
      aria-disabled={isDisabled}
      className={clsx(
        "text-primary-500",
        isDisabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "hover:text-primary-600 transition-colors duration-150 ease-in-out"
      )}
      tabIndex={isDisabled ? -1 : undefined}
    >
      {children}
    </Link>
  )
}
