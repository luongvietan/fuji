"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, LogOut, Settings, CreditCard, ChevronDown } from "lucide-react"

export default function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const email = localStorage.getItem("userEmail") || ""
    setIsLoggedIn(loggedIn)
    setUserEmail(email)

    // Xử lý click bên ngoài để đóng menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    setIsLoggedIn(false)
    setIsOpen(false)
    window.location.reload() // Làm mới trang để cập nhật trạng thái
  }

  if (!isLoggedIn) {
    return (
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
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm flex items-center hover:underline focus:outline-none"
      >
        <div className="flex items-center">
          <Image
            src="/placeholder.svg?height=24&width=24"
            alt="User Avatar"
            width={24}
            height={24}
            className="rounded-full mr-1"
          />
          <span className="mr-1 max-w-[100px] truncate">{userEmail}</span>
          <ChevronDown size={14} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="py-1 border-b border-gray-100">
            <div className="px-4 py-2 text-sm text-gray-700 truncate">{userEmail}</div>
          </div>
          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} className="mr-2" />
              Profile người dùng
            </Link>
            <Link
              href="/doi-mat-khau"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} className="mr-2" />
              Đổi mật khẩu
            </Link>
            <Link
              href="/phuong-thuc-thanh-toan"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <CreditCard size={16} className="mr-2" />
              Phương thức thanh toán
            </Link>
          </div>
          <div className="py-1 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

