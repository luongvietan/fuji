import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fuji Fruit - Cửa hàng trái cây nhập khẩu",
  description: "Cửa hàng trái cây nhập khẩu chất lượng cao",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'