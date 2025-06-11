import { ROUTES } from "@/shared/constants"
import { NavLink } from "./NavLink"
import { AdminNavigation } from "./AdminLinks"
import { ContactInfo } from "./ContactInfo"
import { getToken } from "@/shared/utils"
import Image from "next/image"

export const Header = async ({ token }: { token?: string }) => {
  const isAdminView =
    process.env.NODE_ENV !== "production" || (await getToken())

  return (
    <header className="shadow-xl">
      <nav className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <NavLink href={ROUTES.HOME} className="text-2xl font-bold">
            <Image
              src="/logo.svg"
              alt="Ivver"
              width={160}
              height={60}
              priority
            />
          </NavLink>

          <div className="flex items-center gap-6">
            {isAdminView && <AdminNavigation token={token} />}
          </div>

          <ContactInfo />
        </div>
      </nav>
    </header>
  )
}
