import type { Metadata } from "next"
import { Lato } from "next/font/google"
import "./globals.css"
import { Footer, Header } from "@/widgets"
import clsx from "clsx"
import { cookies } from "next/headers"
import { ToastContainer } from "react-toastify"
import { MAIN_TOAST_CONTAINER_ID } from "@/shared/constants"

const nunitoSans = Lato({
  variable: "--primary-font",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | Ivver",
    default: "Ivver | Магазин автохимии",
  },
  description: "Интернет магазин по продаже автохимии",
  openGraph: {
    title: {
      template: "%s | Ivver",
      default: "Ivver | Магазин автохимии",
    },
    description: "Интернет магазин по продаже автохимии",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  return (
    <html lang="ru">
      <body
        className={clsx(
          nunitoSans.variable,
          "antialiased flex flex-col min-h-screen overflow-x-hidden"
        )}
      >
        <Header token={token} />
        <main className="shrink grow my-8">{children}</main>
        <Footer />
        <ToastContainer
          containerId={MAIN_TOAST_CONTAINER_ID}
          position="top-center"
          autoClose={2000}
          pauseOnHover={false}
        />
      </body>
    </html>
  )
}
