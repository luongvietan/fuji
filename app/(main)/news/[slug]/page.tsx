"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Tag, Facebook, Twitter, Linkedin } from "lucide-react"

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState({
    title: "Lợi ích sức khỏe của việc ăn trái cây mỗi ngày",
    date: "15/03/2023",
    category: "Sức khỏe",
    image: "/placeholder.svg?height=400&width=800",
    content: `
      <p>Trái cây là một phần quan trọng trong chế độ ăn uống lành mạnh. Chúng cung cấp các vitamin, khoáng chất, chất xơ và chất chống oxy hóa cần thiết cho cơ thể. Dưới đây là những lợi ích sức khỏe chính của việc ăn trái cây mỗi ngày:</p>
      
      <h2>Tăng cường hệ miễn dịch</h2>
      <p>Nhiều loại trái cây giàu vitamin C, một chất chống oxy hóa mạnh mẽ giúp tăng cường hệ miễn dịch. Cam, quýt, kiwi và dâu tây là những nguồn vitamin C tuyệt vời.</p>
      
      <h2>Cải thiện sức khỏe tim mạch</h2>
      <p>Trái cây chứa nhiều chất xơ, kali và chất chống oxy hóa có thể giúp giảm huyết áp, cholesterol và nguy cơ mắc bệnh tim. Quả mọng, táo và lê đặc biệt tốt cho sức khỏe tim mạch.</p>
      
      <h2>Hỗ trợ tiêu hóa</h2>
      <p>Chất xơ trong trái cây giúp duy trì hệ tiêu hóa khỏe mạnh và ngăn ngừa táo bón. Trái cây như táo, chuối và đu đủ đặc biệt giàu chất xơ.</p>
      
      <h2>Kiểm soát cân nặng</h2>
      <p>Trái cây ít calo nhưng giàu chất xơ, giúp bạn cảm thấy no lâu hơn. Thay thế đồ ăn nhẹ có nhiều calo bằng trái cây có thể giúp kiểm soát cân nặng.</p>
      
      <h2>Cải thiện sức khỏe da</h2>
      <p>Các chất chống oxy hóa trong trái cây giúp bảo vệ da khỏi tổn thương do tia UV và ô nhiễm. Vitamin C trong trái cây cũng cần thiết cho việc sản xuất collagen, giúp da săn chắc và khỏe mạnh.</p>
      
      <h2>Giảm nguy cơ mắc bệnh mãn tính</h2>
      <p>Nghiên cứu cho thấy ăn nhiều trái cây có thể giảm nguy cơ mắc một số bệnh mãn tính như tiểu đường type 2, đột quỵ và một số loại ung thư.</p>
      
      <h2>Kết luận</h2>
      <p>Ăn ít nhất 2-3 khẩu phần trái cây mỗi ngày là một cách đơn giản nhưng hiệu quả để cải thiện sức khỏe tổng thể. Hãy đa dạng các loại trái cây trong chế độ ăn uống của bạn để tận dụng tối đa các lợi ích dinh dưỡng.</p>
    `,
    author: "Nguyễn Văn A",
    tags: ["trái cây", "sức khỏe", "dinh dưỡng", "vitamin"],
  })

  const [relatedArticles, setRelatedArticles] = useState([
    {
      id: 2,
      title: "Top 10 loại trái cây giàu vitamin C nhất",
      slug: "top-10-loai-trai-cay-giau-vitamin-c-nhat",
      image: "/placeholder.svg?height=200&width=300",
      date: "10/03/2023",
    },
    {
      id: 3,
      title: "Cách bảo quản trái cây tươi lâu trong mùa hè",
      slug: "cach-bao-quan-trai-cay-tuoi-lau-trong-mua-he",
      image: "/placeholder.svg?height=200&width=300",
      date: "05/03/2023",
    },
    {
      id: 4,
      title: "Trái cây nhập khẩu - Xu hướng tiêu dùng mới",
      slug: "trai-cay-nhap-khau-xu-huong-tieu-dung-moi",
      image: "/placeholder.svg?height=200&width=300",
      date: "01/03/2023",
    },
  ])

  // Trong một ứng dụng thực tế, bạn sẽ fetch dữ liệu dựa trên slug
  useEffect(() => {
    // Giả lập việc fetch dữ liệu
    console.log(`Fetching article with slug: ${params.slug}`)
  }, [params.slug])

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#269300]">
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/tin-tuc" className="text-gray-500 hover:text-[#269300]">
              Tin tức
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700">{article.title}</span>
          </nav>

          {/* Article Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative h-[400px] w-full">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar size={16} className="mr-2" />
                <span>{article.date}</span>
                <span className="mx-2">•</span>
                <Tag size={16} className="mr-2" />
                <span>{article.category}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-700 font-medium">{article.author.charAt(0)}</span>
                  </div>
                  <span className="text-gray-700">{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Chia sẻ:</span>
                  <a href="#" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <Facebook size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
                    <Twitter size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-wrap items-center">
                <span className="text-gray-700 mr-3">Tags:</span>
                {article.tags.map((tag, index) => (
                  <a
                    key={index}
                    href="#"
                    className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-[#269300] hover:text-white transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <div key={article.id} className="group">
                  <Link href={`/tin-tuc/${article.slug}`}>
                    <div className="relative h-48 mb-3 overflow-hidden rounded-lg">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-[#269300] transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{article.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

