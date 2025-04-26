"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, PlusCircle, Trash2 } from "lucide-react"

export default function PaymentMethodsPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  // Danh sách phương thức thanh toán mẫu
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "credit_card",
      name: "VISA ****1234",
      expiry: "05/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "credit_card",
      name: "MasterCard ****5678",
      expiry: "08/24",
      isDefault: false,
    },
  ])

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (!loggedIn) {
      router.push("/dang-nhap")
      return
    }

    setIsLoggedIn(loggedIn)
  }, [router])

  const handleSetDefault = (id: number) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const handleDelete = (id: number) => {
    setPaymentMethods((methods) => methods.filter((method) => method.id !== id))
  }

  if (!isLoggedIn) {
    return null // Sẽ chuyển hướng trong useEffect
  }

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-[#269300]">Phương thức thanh toán</h1>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Thẻ của bạn</h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center text-[#269300] hover:text-[#328615]"
                >
                  <PlusCircle size={16} className="mr-1" />
                  <span>Thêm thẻ mới</span>
                </button>
              </div>

              {showAddForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-md">
                  <h3 className="font-medium mb-3">Thêm thẻ mới</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số thẻ</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#269300] focus:border-[#269300]"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hết hạn</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#269300] focus:border-[#269300]"
                          placeholder="MM/YY"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mã bảo mật (CVV)</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#269300] focus:border-[#269300]"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên chủ thẻ</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#269300] focus:border-[#269300]"
                        placeholder="NGUYEN VAN A"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        id="default-card"
                        type="checkbox"
                        className="h-4 w-4 text-[#269300] focus:ring-[#269300] border-gray-300 rounded"
                      />
                      <label htmlFor="default-card" className="ml-2 block text-sm text-gray-700">
                        Đặt làm phương thức thanh toán mặc định
                      </label>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-[#269300] text-white py-2 px-4 rounded-md hover:bg-[#328615] transition duration-200"
                      >
                        Lưu thẻ
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {paymentMethods.length > 0 ? (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border rounded-md p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <CreditCard size={24} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-500">Hết hạn: {method.expiry}</p>
                          {method.isDefault && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full mt-1 inline-block">
                              Mặc định
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className="text-sm text-[#269300] hover:underline"
                          >
                            Đặt làm mặc định
                          </button>
                        )}
                        <button onClick={() => handleDelete(method.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>Bạn chưa có phương thức thanh toán nào</p>
                </div>
              )}

              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium mb-3">Các phương thức thanh toán khác</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 flex items-center">
                    <div className="mr-3 bg-blue-100 p-2 rounded-md">
                      <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.5 11.5h-4v-1h4v1zm4.5-1h-3v1h3v-1zm-4.5 3h-4v1h4v-1zm4.5 0h-3v1h3v-1zm7.5-11h-20c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-20v-14h20v14z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-xs text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                    </div>
                  </div>

                  <div className="border rounded-md p-4 flex items-center">
                    <div className="mr-3 bg-pink-100 p-2 rounded-md">
                      <svg className="h-6 w-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Ví MoMo</p>
                      <p className="text-xs text-gray-500">Thanh toán qua ví điện tử MoMo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

