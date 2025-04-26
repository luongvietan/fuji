"use client"

import Image from "next/image"

export default function Home() {
  return (
    <>
      {/* Hero Banner */}
      <div className="relative bg-[#85caf2] overflow-hidden">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3">
              <Image
                src="/images/logo.png"
                alt="Fuji Fruit Logo"
                width={200}
                height={80}
                className="mb-4"
              />
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold text-[#ff3b30] mb-2 drop-shadow-md">VỊ NGON MÁT LẠNH</h2>
                <h1 className="text-5xl font-bold text-[#ff3b30] mb-6 drop-shadow-md">MÙA HÈ SẢNG KHOÁI</h1>
                <button className="bg-[#269300] text-white px-6 py-2 rounded-full font-bold text-lg shadow-md">
                  ĐẶT HÀNG NGAY
                </button>
              </div>
            </div>
            <div className="md:w-2/3 mt-6 md:mt-0 flex justify-center">
              <div className="relative">
                <Image
                  src="/images/hero-banner.jpg"
                  alt="Fruits splash"
                  width={1000}
                  height={600}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
          <Image
            src="/images/qr-code.png"
            alt="QR Code"
            width={120}
            height={120}
            className="rounded-lg bg-white p-2"
          />
          <p className="text-center text-xs mt-1 text-red-600 font-medium">NHẬN THÊM ƯU ĐÃI</p>
        </div>
      </div>

      {/* 3 Reasons Section */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">3 LÝ DO MUA HOA QUẢ TẠI FUJI</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-[#269300] rounded-full p-4 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-[#269300] font-bold text-lg mb-2">HOA QUẢ TƯƠI SẠCH</h3>
              <p className="text-sm">Quy trình nhập hàng, vận chuyển, bảo quản chuyên nghiệp.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-[#269300] rounded-full p-4 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-[#269300] font-bold text-lg mb-2">ĐỔI TRẢ MIỄN PHÍ</h3>
              <p className="text-sm">Đổi trả miễn phí trong 24h khi khách hàng không hài lòng.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-[#269300] rounded-full p-4 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-[#269300] font-bold text-lg mb-2">GIÁ CẢ CẠNH TRANH</h3>
              <p className="text-sm">Fuji Fruit luôn đặt lợi ích cho người tiêu dùng lên hàng đầu.</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Fuji Section */}
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#269300] mb-6">ĐÔI NÉT VỀ FUJI</h2>
              <div className="text-sm space-y-4">
                <p>
                  Với tôn chỉ "Mang đến cho khách hàng những gì là những sản phẩm trái cây tươi ngon, chất lượng cao, mà
                  kèm theo đó là những dịch vụ tiện ích thân thiện. Công ty CP xuất nhập khẩu Fuji" - đơn vị chuyên nhập
                  khẩu các loại trái cây tươi từ các nước trên thế giới đang từng bước phát triển và chiếm được lòng tin
                  của người tiêu dùng Việt Nam.
                </p>
                <p>
                  Hiện tại, công ty có hệ thống các cửa hàng mang thương hiệu Hoa quả sạch Fuji được phân bố rộng khắp
                  trên địa bàn các tỉnh phía Bắc phục vụ đủ nhu cầu cho mọi khách hàng. Bằng những nỗ lực không ngừng
                  theo thời gian, hệ thống Hoa quả sạch Fuji từng ngày hoàn thiện hơn về tất cả mọi mặt.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/about-fuji.jpg"
                alt="Fruit collage"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-[#269300] mb-8">DANH MỤC SẢN PHẨM</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Giỏ quà tặng", image: "/images/categories/gift-basket.jpg" },
              { name: "Đặc sản vùng miền", image: "/images/categories/local-specialties.jpg" },
              { name: "Hoa quả bốc sẵn", image: "/images/categories/fresh-fruits.jpg" },
              { name: "Táo nhập khẩu", image: "/images/categories/imported-apples.jpg" },
              { name: "Nho nhập khẩu", image: "/images/categories/imported-grapes.jpg" },
              { name: "Cherry", image: "/images/categories/cherry.jpg" },
              { name: "Kiwi", image: "/images/categories/kiwi.jpg" },
              { name: "Việt quất", image: "/images/categories/blueberry.jpg" },
              { name: "Hoa quả khác", image: "/images/categories/other-fruits.jpg" },
            ].map((category, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-md border border-dashed border-gray-400">
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

