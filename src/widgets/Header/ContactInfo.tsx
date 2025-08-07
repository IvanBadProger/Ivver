import { CONTACTS } from "@/shared/constants"
import { PhoneCall } from "lucide-react"
import { NavLink } from "./NavLink"

export const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-3">
      {Object.values(CONTACTS).map((phone) => (
        <NavLink key={phone.raw} href={phone.link} className="p-0!">
          <PhoneCall className="text-gray-600" />
          {phone.formatted}
        </NavLink>
      ))}
    </div>
  )
}
