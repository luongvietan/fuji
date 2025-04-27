"use client"

import Image from "next/image"
import Link from "next/link"

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Nho Xanh Sữa Hàn Quốc",
      image: "/products/nho-xanh.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Lê",
      image: "/products/le.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Táo hữu cơ Juliet",
      image: "/products/tao-juliet.jpg",
      rating: 5,
    },
    {
      id: 4,
      name: "HỘP QUÀ CHERRY CAO CẤP",
      image: "/products/cherry-gift.jpg",
      rating: 5,
    },
    {
      id: 5,
      name: "Hộp quà Biểu tặng Envy 8",
      image: "/products/envy-gift.jpg",
      rating: 5,
    },
    {
      id: 6,
      name: "Hộp quà Biểu tặng Envy 9",
      image: "/products/envy-gift-2.jpg",
      rating: 5,
    },
    {
      id: 7,
      name: "Hộp quà Kiwi cao cấp",
      image: "/products/kiwi-gift.jpg",
      rating: 5,
    },
    {
      id: 8,
      name: "Táo Dazzle Mỹ",
      image: "/products/tao-dazzle.jpg",
      rating: 5,
    },
  ]

  return (
    <>
      {/* Product Listing */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#269300] mb-10">BEST-SELLER (SẢN PHẨM BÁN CHẠY)</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col items-center border p-4 rounded-lg">
                <div className="relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded-full">Hot</div>
                </div>

                <div className="flex items-center mb-2">
                  {Array.from({ length: product.rating }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <h3 className="text-center font-medium mb-2">{product.name}</h3>

                <Link href="#" className="text-[#ffa627] hover:underline mt-auto">
                  Liên hệ
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

