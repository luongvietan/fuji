"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Trash2, Plus, Minus } from "lucide-react"

export default function CartPage() {
  // Sử dụng dữ liệu tĩnh thay vì context để đơn giản hóa
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nho Xanh Sữa Hàn Quốc",
      price: 250000,
      quantity: 1,
      image: "/products/nho-xanh.jpg",
    },
    {
      id: 2,
      name: "Táo hữu cơ Juliet",
      price: 180000,
      quantity: 1,
      image: "/products/tao-juliet.jpg",
    },
    {
      id: 3,
      name: "Kiwi New Zealand",
      price: 220000,
      quantity: 1,
      image: "/products/kiwi-gift.jpg",
    },
  ])

  // Hàm định dạng giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  // Tính tổng tiền
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 30000
  const total = subtotal + shipping

  // Hàm xử lý cập nhật số lượng
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Xóa sản phẩm nếu số lượng <= 0
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      // Cập nhật số lượng
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  // Hàm xóa sản phẩm
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Hàm xóa tất cả
  const clearCart = () => {
    setCartItems([])
  }

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-[#269300]">Giỏ hàng của bạn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Sản phẩm ({cartItems.length})</h2>
              </div>

              {cartItems.length > 0 ? (
                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 border-b flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-[#269300] font-semibold mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center border rounded-md">
                        <button
                          className="p-2 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="p-2 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        <button
                          className="text-red-500 mt-2 flex items-center text-sm hover:underline"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={14} className="mr-1" />
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
                  <Link
                    href="/san-pham"
                    className="mt-4 inline-block bg-[#269300] text-white px-4 py-2 rounded-md hover:bg-[#328615]"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
              )}

              <div className="p-4 bg-gray-50 flex justify-between">
                <Link href="/san-pham" className="text-[#269300] hover:underline flex items-center">
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Tiếp tục mua sắm
                </Link>
                <button
                  className="text-red-500 hover:underline flex items-center"
                  onClick={clearCart}
                  disabled={cartItems.length === 0}
                >
                  <Trash2 size={16} className="mr-1" />
                  Xóa tất cả
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Tổng đơn hàng</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">{formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold">Tổng cộng:</span>
                  <span className="font-bold text-[#269300]">{formatPrice(total)}</span>
                </div>

                <button
                  className="w-full bg-[#269300] text-white py-3 rounded-md hover:bg-[#328615] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cartItems.length === 0}
                >
                  Tiến hành thanh toán
                </button>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Chúng tôi chấp nhận:</h3>
                  <div className="flex gap-2">
                    <div className="border rounded p-1 w-12 h-8 flex items-center justify-center bg-gray-100">
                      <span className="text-xs">VISA</span>
                    </div>
                    <div className="border rounded p-1 w-12 h-8 flex items-center justify-center bg-gray-100">
                      <span className="text-xs">MC</span>
                    </div>
                    <div className="border rounded p-1 w-12 h-8 flex items-center justify-center bg-gray-100">
                      <span className="text-xs">MOMO</span>
                    </div>
                    <div className="border rounded p-1 w-12 h-8 flex items-center justify-center bg-gray-100">
                      <span className="text-xs">COD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden mt-4 p-4">
              <h3 className="font-medium mb-2">Mã giảm giá</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="flex-grow border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#269300]"
                />
                <button className="bg-[#269300] text-white px-4 py-2 rounded-r-md hover:bg-[#328615]">Áp dụng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

