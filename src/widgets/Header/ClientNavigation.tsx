import { ROUTES } from "@/shared/constants"
import { NavLink } from "./NavLink"

export const ClientNavigation = () => {
  return (
    <>
      <NavLink href={ROUTES.HOME}>Главная</NavLink>
    </>
  )
}
