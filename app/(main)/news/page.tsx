"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react"

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: "Lợi ích sức khỏe của việc ăn trái cây mỗi ngày",
      slug: "loi-ich-suc-khoe-cua-viec-an-trai-cay-moi-ngay",
      excerpt:
        "Ăn trái cây mỗi ngày không chỉ cung cấp vitamin và khoáng chất mà còn giúp tăng cường hệ miễn dịch và giảm nguy cơ mắc nhiều bệnh mãn tính.",
      image: "/placeholder.svg?height=200&width=400",
      date: "15/03/2023",
      category: "Sức khỏe",
    },
    {
      id: 2,
      title: "Top 10 loại trái cây giàu vitamin C nhất",
      slug: "top-10-loai-trai-cay-giau-vitamin-c-nhat",
      excerpt:
        "Vitamin C là một chất chống oxy hóa mạnh mẽ giúp tăng cường hệ miễn dịch. Hãy khám phá những loại trái cây chứa hàm lượng vitamin C cao nhất.",
      image: "/placeholder.svg?height=200&width=400",
      date: "10/03/2023",
      category: "Dinh dưỡng",
    },
    {
      id: 3,
      title: "Cách bảo quản trái cây tươi lâu trong mùa hè",
      slug: "cach-bao-quan-trai-cay-tuoi-lau-trong-mua-he",
      excerpt:
        "Mùa hè nóng bức khiến trái cây dễ hỏng hơn. Bài viết này sẽ chia sẻ những mẹo đơn giản giúp bạn bảo quản trái cây tươi ngon lâu hơn.",
      image: "/placeholder.svg?height=200&width=400",
      date: "05/03/2023",
      category: "Mẹo vặt",
    },
    {
      id: 4,
      title: "Trái cây nhập khẩu - Xu hướng tiêu dùng mới",
      slug: "trai-cay-nhap-khau-xu-huong-tieu-dung-moi",
      excerpt:
        "Người tiêu dùng Việt Nam ngày càng ưa chuộng trái cây nhập khẩu với chất lượng cao và hương vị đặc trưng. Tìm hiểu về xu hướng này.",
      image: "/placeholder.svg?height=200&width=400",
      date: "01/03/2023",
      category: "Thị trường",
    },
  ])

  const [categories, setCategories] = useState([
    { name: "Tất cả", count: 10 },
    { name: "Sức khỏe", count: 4 },
    { name: "Dinh dưỡng", count: 3 },
    { name: "Mẹo vặt", count: 2 },
    { name: "Thị trường", count: 1 },
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(3)

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-[#269300]">Tin tức</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {newsItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={400}
                        height={200}
                        className="h-48 w-full object-cover md:h-full md:w-48"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar size={16} className="mr-2" />
                        <span>{item.date}</span>
                        <span className="mx-2">•</span>
                        <Tag size={16} className="mr-2" />
                        <span>{item.category}</span>
                      </div>
                      <Link href={`/tin-tuc/${item.slug}`}>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-[#269300] transition-colors">
                          {item.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                      <Link href={`/tin-tuc/${item.slug}`} className="text-[#269300] font-medium hover:underline">
                        Đọc tiếp
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-md border text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === i + 1 ? "bg-[#269300] text-white" : "border text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-md border text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Danh mục</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a href="#" className="flex justify-between items-center text-gray-700 hover:text-[#269300]">
                      <span>{category.name}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1">{category.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Bài viết gần đây</h3>
              <ul className="space-y-4">
                {newsItems.slice(0, 3).map((item) => (
                  <li key={item.id} className="flex space-x-3">
                    <div className="flex-shrink-0 w-16 h-16 relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <Link href={`/tin-tuc/${item.slug}`} className="text-sm font-medium hover:text-[#269300]">
                        {item.title}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Commitments */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Cam kết của chúng tôi</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#269300]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">100% trái cây tươi ngon</span>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#269300]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Giao hàng nhanh chóng</span>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#269300]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Đổi trả trong 24h</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

