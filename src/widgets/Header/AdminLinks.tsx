"use client"

import { Button } from "@/shared/ui"
import { ChevronDown } from "lucide-react"
import { NavLink } from "./NavLink"
import { Logout } from "@/components/Admin/api"
import { ROUTES } from "@/shared/constants"

// fix: почему-то обновляется надпись со второго раза или после обновления
export const AdminNavigation = ({ token }: { token?: string }) => {
  return (
    <div className="relative group">
      <Button mode="outline">
        Админ
        <ChevronDown className="group-hover:transform group-hover:rotate-180 transition-transform duration-200" />
      </Button>

      <div className="absolute hidden group-hover:block top-full left-0 z-50">
        <div className="py-2 bg-white rounded-lg shadow-xl border border-primary-100">
          <NavLink
            href={ROUTES.AUTH}
            isDark
            onClick={token ? () => Logout(token ?? "") : undefined}
          >
            {token ? "Выйти" : "Авторизация"}
          </NavLink>
          <NavLink href={ROUTES.DASHBOARD} isDark>
            Панель управления
          </NavLink>
        </div>
      </div>
    </div>
  )
}
