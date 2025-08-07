import { MenuItem } from "@/widgets/MenuItem"
import clsx from "clsx"
import Link from "next/link"

type MenuProps = {
  menuItems: MenuItem[]
  activeValue: string
}

export const Menu = (props: MenuProps) => {
  const { menuItems, activeValue } = props

  return (
    <div className="relative">
      <ul className="divide-y divide-gray-200 text-sm font-medium overflow-y-auto md:max-h-[70dvh] max-h-[30dvh] relative">
        {menuItems.map((item, index) => {
          const isActive = item.value === activeValue

          return (
            <li key={index}>
              <Link
                className={clsx(
                  "block px-4 py-2 transition-colors hover:bg-primary-200 hover:text-black line-clamp-2",
                  isActive ? "text-gray-900 bg-primary-100" : "text-gray-600"
                )}
                href={item.getHref()}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Градиентный фильтр внизу */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </div>
  )
}
