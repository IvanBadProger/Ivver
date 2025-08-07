import { Title } from "@/shared/ui"
import clsx from "clsx"
import { PropsWithChildren } from "react"

interface SidebarProps extends PropsWithChildren {
  title: string
}

export const Sidebar = (props: SidebarProps) => {
  const { children, title } = props

  return (
    <aside>
      <div className={clsx("sticky left-0 top-8 rounded-lg bg-white shadow-md")}>
        <Title size="md" className="p-4">
          {title}
        </Title>

        {children}
      </div>
    </aside>
  )
}
