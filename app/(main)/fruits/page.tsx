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
    dispatch(fetchAllFruits({ page: 0, size: 10 }));
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchFruitsByName({ name: searchTerm, page: 0, size: 10 }));
    } else {
      dispatch(fetchAllFruits({ page: 0, size: 10 }));
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= pagination.totalPages) return;
    if (searchTerm.trim()) {
      dispatch(searchFruitsByName({ name: searchTerm, page, size: 10 }));
    } else {
      dispatch(fetchAllFruits({ page, size: 10 }));
    }
  };

  const handleAddToCart = (product: Fruit) => {
    dispatch(addToCart({
      fruitId: product.id,
      quantity: 1,
      fruitName: product.name,
      fruitCategory: product.categories,
      fruitPrice: product.price,
      image: product.image,
    }));
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Tìm kiếm */}
        <form onSubmit={handleSearch} className="mb-8 flex justify-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm hoa quả..."
            className="w-full max-w-md px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-green-800"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Tìm kiếm
          </button>
        </form>

        {/* Trạng thái tải và lỗi */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="w-full h-[200px] bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}
        {error && <div className="text-center text-red-500 text-lg">Lỗi: {error}</div>}

        {/* Danh sách sản phẩm */}
        {!loading && !error && fruits.length === 0 && (
          <div className="text-center text-green-600 text-lg">Không tìm thấy hoa quả nào.</div>
        )}
        {!loading && !error && fruits.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {fruits.map((product: Fruit) => (
              <div
                key={product.id}
                className="flex flex-col items-center bg-white border border-green-200 rounded-2xl p-4 transition-shadow duration-300 hover:bg-green-50 hover:border-green-400 hover:scale-105 hover:shadow-lg hover:shadow-green-200"
              >
                <div className="relative mb-4 w-full h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src={`${BaseURL.baseImage}${product.image}` || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-lime-300 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                      Giảm {product.discount * 100}%
                    </div>
                  )}
                </div>

                <div className="flex items-center mb-2">
                  {Array.from({ length: Math.round(product.averageRating) }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <h3 className="text-center text-base font-semibold text-green-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-green-600 mb-3 font-medium">
                  {product.discount > 0 ? (
                    <>
                      <span className="line-through mr-2 text-sm text-gray-400">${product.price}</span>
                      <span className="text-lg">
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
                    className="text-green-600 font-medium hover:underline transition-colors duration-200"
                  >
                    Xem chi tiết
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stockStatus === 'OUT_OF_STOCK'}
                    className={`px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 ${product.stockStatus === 'OUT_OF_STOCK' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={`Thêm ${product.name} vào giỏ hàng`}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="inline-flex gap-2">
              <button
                onClick={() => handlePageChange(pagination.pageNumber - 1)}
                disabled={pagination.first}
                className="p-2 bg-white border border-green-300 rounded-full text-green-600 hover:bg-green-50 disabled:opacity-50"
                aria-label="Trang trước"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => handlePageChange(pagination.pageNumber + 1)}
                disabled={pagination.last}
                className="p-2 bg-white border border-green-300 rounded-full text-green-600 hover:bg-green-50 disabled:opacity-50"
                aria-label="Trang tiếp theo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;