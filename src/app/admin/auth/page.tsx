import { AuthForm } from "./AuthForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    follow: false,
  },
}

export default function Auth() {
  return <AuthForm />
}
