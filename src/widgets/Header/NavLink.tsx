import clsx from "clsx"
import Link from "next/link"

type NavLinkProps = {
  href: string
  children: React.ReactNode
  isDark?: boolean
  className?: string
  onClick?: () => void
}

export const NavLink = ({
  className,
  href,
  children,
  isDark = false,
  onClick,
}: NavLinkProps) => (
  <Link
    onClick={onClick}
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
