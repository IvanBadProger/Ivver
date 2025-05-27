import { ROUTES } from "@/shared/constants"
import { NavLink } from "./NavLink"
import { AdminNavigation } from "./AdminLinks"
import { ContactInfo } from "./ContactInfo"

export const Header = ({ token }: { token?: string }) => {
  return (
    <header className="bg-gradient-to-r from-primary-700 to-secondary-800 shadow-lg">
      <nav className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <NavLink href={ROUTES.HOME} className="text-2xl font-bold">
            Ivver
          </NavLink>

          <div className="flex items-center gap-6">
            {process.env.NODE_ENV !== "production" && (
              <>
                <AdminNavigation token={token} />
              </>
            )}
          </div>

          <ContactInfo />
        </div>
      </nav>
    </header>
  )
}
