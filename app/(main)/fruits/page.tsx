'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAllFruits, searchFruitsByName, Fruit, FruitState } from '@/app/store/slices/fruitSlice';
import { AppDispatch, RootState } from '@/app/store';
import { BaseURL } from '@/app/utils/baseUrl';
import { addToCart } from '@/app/store/slices/cartSlice';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fruits, pagination, loading, error } = useSelector<RootState, FruitState>(
    (state) => state.fruit
  );
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAllFruits({ page: 0, size: 8 }));
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchFruitsByName({ name: searchTerm, page: 0, size: 8 }));
    } else {
      dispatch(fetchAllFruits({ page: 0, size: 8 }));
    }
  };

  const handlePageChange = (page: number) => {
    if (searchTerm.trim()) {
      dispatch(searchFruitsByName({ name: searchTerm, page, size: 8 }));
    } else {
      dispatch(fetchAllFruits({ page, size: 8 }));
    }
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (product: Fruit) => {
    dispatch(addToCart({ fruitId: product.id, quantity: 1 , fruitName: product.name, fruitCategory: product.categories, fruitPrice: product.price, image: product.image }));
  };

  return (
    <div className="py-10 bg-white">
      <div className="container mx-auto px-4">
        {/* Tiêu đề */}
        <h2 className="text-3xl font-bold text-center text-[#269300] mb-10">
          BEST-SELLER (SẢN PHẨM BÁN CHẠY)
        </h2>

        {/* Thanh tìm kiếm */}
        <form onSubmit={handleSearch} className="mb-8 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm hoa quả..."
            className="w-full max-w-md px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#269300]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#269300] text-white rounded-r-lg hover:bg-[#1e7a00]"
          >
            Tìm kiếm
          </button>
        </form>

        {/* Trạng thái tải và lỗi */}
        {loading && <div className="text-center">Đang tải...</div>}
        {error && <div className="text-center text-red-500">Lỗi: {error}</div>}

        {/* Danh sách sản phẩm */}
        {!loading && !error && fruits.length === 0 && (
          <div className="text-center">Không tìm thấy hoa quả nào.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {fruits.map((product: Fruit) => (
            <div
              key={product.id}
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-4 transition-shadow duration-300 hover:shadow-lg hover:shadow-[#269300]/50"
            >
              <div className="relative mb-4 w-[200px] h-[200px]">
                <Image
                  src={`${BaseURL.baseImage}${product.image}` || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded-full">
                    Giảm {product.discount * 100}%
                  </div>
                )}
              </div>

              <div className="flex items-center mb-2">
                {Array.from({ length: Math.round(product.averageRating) }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <h3 className="text-center text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-3 font-medium">
                {product.discount > 0 ? (
                  <>
                    <span className="line-through mr-2 text-sm">${product.price}</span>
                    <span className="text-red-500 text-lg">
                      ${(product.price * (1 - product.discount)).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg">${product.price}</span>
                )}
              </p>

              <div className="flex gap-3 mt-auto">
                <Link
                  href={`/fruits/${product.id}`}
                  className="text-[#ffa627] font-medium hover:underline transition-colors duration-200"
                >
                  Xem chi tiết
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-3 py-1 bg-[#269300] text-white rounded-md hover:bg-[#1e7a00] transition-colors duration-200"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => handlePageChange(pagination.pageNumber - 1)}
                disabled={pagination.first}
                className="px-3 py-2 bg-white border border-gray-300 rounded-l-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Trước
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`px-3 py-2 border border-gray-300 ${
                    pagination.pageNumber === i
                      ? 'bg-[#269300] text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pagination.pageNumber + 1)}
                disabled={pagination.last}
                className="px-3 py-2 bg-white border border-gray-300 rounded-r-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Sau
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;