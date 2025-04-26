'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react'
import { useAuth } from '../../contexts/auth-context'
import { useCart } from '../../contexts/cart-context'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { isLoggedIn, logout, userEmail } = useAuth()
  const { totalItems } = useCart()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-[#269300]">Fuji Fruit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#269300] font-medium">
              Trang chủ
            </Link>
            <Link href="/san-pham" className="text-gray-700 hover:text-[#269300] font-medium">
              Sản phẩm
            </Link>
            <Link href="/tin-tuc" className="text-gray-700 hover:text-[#269300] font-medium">
              Tin tức
            </Link>
            <Link href="/gioi-thieu" className="text-gray-700 hover:text-[#269300] font-medium">
              Giới thiệu
            </Link>
            <Link href="/lien-he" className="text-gray-700 hover:text-[#269300] font-medium">
              Liên hệ
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/gio-hang" className="relative text-gray-700 hover:text-[#269300]">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#269300] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center text-gray-700 hover:text-[#269300]"
                >
                  <User size={24} />
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      {userEmail}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile người dùng
                    </Link>
                    <Link
                      href="/doi-mat-khau"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Đổi mật khẩu
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/dang-nhap" className="text-gray-700 hover:text-[#269300]">
                <User size={24} />
              </Link>
            )}

            {/* Admin Link */}
            <Link href="/admin" className="hidden md:block text-gray-700 hover:text-[#269300] font-medium">
              Admin
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-[#269300]"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#269300] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                href="/san-pham"
                className="text-gray-700 hover:text-[#269300] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sản phẩm
              </Link>
              <Link
                href="/tin-tuc"
                className="text-gray-700 hover:text-[#269300] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tin tức
              </Link>
              <Link
                href="/gioi-thieu"
                className="text-gray-700 hover:text-[#269300] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Giới thiệu
              </Link>
              <Link
                href="/lien-he"
                className="text-gray-700 hover:text-[#269300] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Liên hệ
              </Link>
              <Link
                href="/admin"
                className="text-gray-700 hover:text-[#269300] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

