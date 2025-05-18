"use client"
import { ADMIN_MENU_ITEMS } from "@/components/Admin"
import { Menu, Sidebar } from "@/widgets"
import { useSearchParams } from "next/navigation"

export const AdminSidebar = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") ?? "products"

  return (
    <Sidebar title="Менюшечка">
      <Menu menuItems={ADMIN_MENU_ITEMS} activeValue={tab} />
    </Sidebar>
  )
}
