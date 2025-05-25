import { Mail, PhoneCall } from "lucide-react"
import { NavLink } from "./NavLink"
import { CONTACTS } from "@/shared/constants"

export const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-3">
      <NavLink href={CONTACTS.PHONE_LINK()} className="p-0!">
        <PhoneCall className="text-secondary-300" />
        {CONTACTS.PHONE}
      </NavLink>

      <NavLink href={`mailto:${CONTACTS.EMAIL}`} className="p-0!">
        <Mail className="text-secondary-300" />
        {CONTACTS.EMAIL}
      </NavLink>
    </div>
  )
}
