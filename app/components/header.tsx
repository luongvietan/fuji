"use client"

import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

export default function Header() {
  return (
    <>
      {/* Top header */}
      <div className="bg-[#269300] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Hoa quả sạch Fuji: 1900 2268
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/gio-hang" className="text-sm flex items-center hover:underline relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Giỏ hàng
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link href="/dang-nhap" className="text-sm font-medium flex items-center hover:text-[#269300] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Đăng nhập
            </Link>
            <Link href="/admin" className="text-sm flex items-center hover:underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Admin
            </Link>
            <Image
              src="/images/user.png"
              alt="Fuji Fruit Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-[#269300] py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input type="text" placeholder="Tìm kiếm..." className="w-full py-2 px-4 rounded-md" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-2 py-2">
            <Link href="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full">
              Home
            </Link>
            <Link href="/san-pham" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full">
              Sản phẩm
            </Link>
            <Link href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full">
              Thanh toán
            </Link>
            <Link href="/tin-tuc" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full">
              Tin tức
            </Link>
            <Link href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full">
              Giới thiệu
            </Link>
            <Link href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full">
              Hệ thống
            </Link>
            <Link href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full">
              Liên hệ
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

