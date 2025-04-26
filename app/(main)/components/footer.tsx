"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#269300]">Fuji Fruit</h3>
            <p className="text-gray-600 mb-4">
              Chuyên cung cấp các loại trái cây nhập khẩu chất lượng cao, đảm bảo tươi ngon và an toàn cho sức khỏe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#269300]">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#269300]">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#269300]">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#269300]">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#269300]">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/san-pham" className="text-gray-600 hover:text-[#269300]">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="text-gray-600 hover:text-[#269300]">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="text-gray-600 hover:text-[#269300]">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-gray-600 hover:text-[#269300]">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#269300]">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/san-pham?category=trai-cay-nhap-khau" className="text-gray-600 hover:text-[#269300]">
                  Trái cây nhập khẩu
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=trai-cay-viet-nam" className="text-gray-600 hover:text-[#269300]">
                  Trái cây Việt Nam
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=trai-cay-theo-mua" className="text-gray-600 hover:text-[#269300]">
                  Trái cây theo mùa
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=qua-tang" className="text-gray-600 hover:text-[#269300]">
                  Giỏ quà tặng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#269300]">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-[#269300] mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Đường Trái Cây, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-[#269300] mr-2 flex-shrink-0" />
                <span className="text-gray-600">0123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-[#269300] mr-2 flex-shrink-0" />
                <span className="text-gray-600">info@fujifruit.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Fuji Fruit. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

