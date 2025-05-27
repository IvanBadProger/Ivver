import { Title } from "@/shared/ui"
import clsx from "clsx"
import { PropsWithChildren } from "react"

interface SidebarProps extends PropsWithChildren {
  title: string
}
// const SIZE_CLASSES = "xl:w-64 lg:w-48 md:w-24"

export const Sidebar = (props: SidebarProps) => {
  const { children, title } = props

  return (
    <aside className="">
      <div
        className={clsx(
          "sticky left-0 top-8 rounded-lg bg-white shadow-md"
          // SIZE_CLASSES
        )}
      >
        <Title size="md" className="p-4">
          {title}
        </Title>

        {children}
      </div>
    </aside>
  )
}
