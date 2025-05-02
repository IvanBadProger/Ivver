import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"
import "./globals.css"
import { Footer, Header } from "@/widgets"

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`${nunitoSans.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="shrink grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
