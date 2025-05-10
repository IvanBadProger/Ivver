import { CONTACTS, ROUTES } from "@/shared/constants"
import { Button } from "@/shared/ui"
import clsx from "clsx"
import { ChevronDown, Mail, PhoneCall } from "lucide-react"
import Link from "next/link"

// utils/formatters.ts
export const formatPhoneNumber = (phone: string): string => {
  // Добавьте логику форматирования
  return phone
}

type NavLinkProps = {
  href: string
  children: React.ReactNode
  isDark?: boolean
  className?: string
}

const NavLink = ({
  className,
  href,
  children,
  isDark = false,
}: NavLinkProps) => (
  <Link
    href={href}
    className={clsx(
      "px-4 py-2 transition-colors duration-200 flex items-center gap-2",
      isDark
        ? "text-primary-800 hover:bg-primary-100"
        : "text-primary-50 hover:text-primary-200",
      className
    )}
  >
    {children}
  </Link>
)

export const AdminNavigation = () => {
  return (
    <div className="relative group">
      <Button mode="outline">
        Админ
        <ChevronDown className="group-hover:transform group-hover:rotate-180 transition-transform duration-200" />
      </Button>

      <div className="absolute hidden group-hover:block top-full left-0 z-50">
        <div className="py-2 bg-white rounded-lg shadow-xl border border-primary-100">
          <NavLink href={ROUTES.AUTH} isDark>
            Авторизация
          </NavLink>
          <NavLink href={ROUTES.DASHBOARD} isDark>
            Панель управления
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export const ClientNavigation = () => {
  return (
    <>
      <NavLink href={ROUTES.HOME}>Главная</NavLink>
    </>
  )
}

export const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-3">
      <NavLink href={CONTACTS.PHONE_LINK()} className="p-0!">
        <PhoneCall className="text-secondary-300" />
        {formatPhoneNumber(CONTACTS.PHONE)}
      </NavLink>

      <NavLink href={`mailto:${CONTACTS.EMAIL}`} className="p-0!">
        <Mail className="text-secondary-300" />
        {CONTACTS.EMAIL}
      </NavLink>
    </div>
  )
}

export const Header = () => {
  return (
    // fix: придумать градиент нормальный
    <header className="bg-gradient-to-r from-primary-700 to-secondary-800 shadow-lg">
      <nav className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <NavLink href={ROUTES.HOME} className="text-2xl font-bold">
            Ivver
          </NavLink>

          <div className="flex items-center gap-6">
            <ClientNavigation />
            <AdminNavigation />
          </div>

          <ContactInfo />
        </div>
      </nav>
    </header>
  )
}
