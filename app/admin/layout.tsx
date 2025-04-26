import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Fuji Fruit",
  description: "Quản lý cửa hàng trái cây Fuji Fruit",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

