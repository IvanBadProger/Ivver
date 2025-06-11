import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"
import { Footer, Header } from "@/widgets"
import clsx from "clsx"
import { ToastContainer } from "react-toastify"
import { MAIN_TOAST_CONTAINER_ID } from "@/shared/constants"
import { getToken } from "@/shared/utils"

const font = Rubik({
  variable: "--primary-font",
  subsets: ["latin"],
  weight: ["300", "400", "700", "500"],
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

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function RootLayout({
  children,
}: RootLayoutProps) {
  const token = await getToken()

  return (
    <html lang="ru">
      <body
        className={clsx(
          font.variable,
          "antialiased flex flex-col min-h-screen overflow-x-hidden",
          "bg-gradient-to-br from-primary-50 to-secondary-50"
        )}
      >
        <Header token={token} />
        <main className="shrink grow my-6">{children}</main>
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
