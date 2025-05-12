'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { fetchFruitById, fetchRelatedFruits, Fruit, FruitState } from '@/app/store/slices/fruitSlice';
import { addToCart } from '@/app/store/slices/cartSlice';
import { AppDispatch, RootState } from '@/app/store';
import { BaseURL } from '@/app/utils/baseUrl';
import Link from 'next/link';

// Hàm sinh màu nền ngẫu nhiên cho tags
const getRandomColor = () => {
  const colors = [
    'bg-green-200 text-green-800',
    'bg-lime-200 text-lime-800',
    'bg-emerald-200 text-emerald-800',
    'bg-teal-200 text-teal-800',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProductDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { selectedFruit, relatedFruits, loading, error } = useSelector<RootState, FruitState>(
    (state) => state.fruit
  );
  const cartLoading = useSelector<RootState, boolean>((state) => state.cart.loading);

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      dispatch(fetchFruitById(Number(id)));
      console.log(selectedFruit);
      dispatch(fetchRelatedFruits({
        fruitId: Number(id),
      }));

    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (selectedFruit) {
      dispatch(addToCart({
        fruitId: selectedFruit.id,
        quantity: 1,
        fruitName: selectedFruit.name,
        fruitCategory: selectedFruit.categories,
        fruitPrice: selectedFruit.price,
        image: selectedFruit.image,
      }));
    }
  };

  if (loading) return <div className="text-center py-20 text-green-600 text-lg">Đang tải...</div>;
  if (error) return <div className="text-center py-20 text-red-500 text-lg">Lỗi: {error}</div>;
  if (!selectedFruit) return <div className="text-center py-20 text-green-600 text-lg">Không tìm thấy sản phẩm</div>;

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6">
              {/* Hình ảnh sản phẩm */}
              <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                <Image
                  src={`${BaseURL.baseImage}${selectedFruit.image}` || '/placeholder.svg'}
                  alt={selectedFruit.name}
                  fill
                  className="object-cover"
                  priority
                />
                {selectedFruit.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-lime-300 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                    Giảm {selectedFruit.discount * 100}%
                  </div>
                )}
              </div>

              {/* Thông tin sản phẩm */}
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-green-800">{selectedFruit.name}</h1>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.round(selectedFruit.averageRating) }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="text-xl md:text-2xl font-semibold text-green-800">
                  {selectedFruit.discount > 0 ? (
                    <>
                      <span className="line-through text-gray-400 mr-2">${selectedFruit.price}</span>
                      <span className="text-green-600">
                        ${(selectedFruit.price * (1 - selectedFruit.discount)).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span>${selectedFruit.price}</span>
                  )}
                </div>

                <div className="flex flex-col gap-3 text-sm text-green-700">
                  <p>
                    <span className="font-medium">Danh mục:</span>{' '}
                    {selectedFruit.categories.map((cat) => cat.name).join(', ')}
                  </p>
                  <p className="flex gap-2 items-center flex-wrap">
                    {selectedFruit.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRandomColor()}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                  <p>
                    <span className="font-medium">Nguồn gốc:</span> {selectedFruit.origin}
                  </p>
                  <p>
                    <span className="font-medium">Trọng lượng:</span> {selectedFruit.weight} kg
                  </p>
                  <p>
                    <span className="font-medium">Trạng thái kho:</span>{' '}
                    <span
                      className={
                        selectedFruit.stockStatus === 'LOW_STOCK'
                          ? 'text-yellow-500 font-semibold'
                          : selectedFruit.stockStatus === 'OUT_OF_STOCK'
                            ? 'text-red-500 font-semibold'
                            : 'text-green-600 font-semibold'
                      }
                    >
                      {selectedFruit.stockStatus === 'IN_STOCK'
                        ? 'Còn hàng'
                        : selectedFruit.stockStatus === 'LOW_STOCK'
                          ? 'Sắp hết hàng'
                          : 'Hết hàng'}
                    </span>
                  </p>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={selectedFruit.stockStatus === 'OUT_OF_STOCK' || cartLoading}
                  className={`mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-semibold ${selectedFruit.stockStatus === 'OUT_OF_STOCK' || cartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label="Thêm sản phẩm vào giỏ hàng"
                >
                  {cartLoading ? 'Đang xử lý...' : 'Thêm vào giỏ hàng'}
                </button>
              </div>
            </div>

            {/* Mô tả sản phẩm */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-3">Mô tả sản phẩm</h2>
              <p className="text-green-700 leading-relaxed text-sm">{selectedFruit.description}</p>
            </div>
          </div>

          {/* Related Products (Gợi ý sản phẩm cùng danh mục) */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-green-800 mb-4">Sản phẩm tương tự</h2>
              <div className="flex flex-col gap-4">
                {relatedFruits.length > 0 ? (
                  relatedFruits.slice(0, 4).map((fruit: Fruit) => (
                    <Link key={fruit.id} href={`/fruits/${fruit.id}`} className="flex gap-3 items-center hover:bg-green-50 p-2 rounded-lg transition-colors">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={`${BaseURL.baseImage}${fruit.image}` || '/placeholder.svg'}
                          alt={fruit.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-green-800">{fruit.name}</h3>
                        <p className="text-xs text-green-600">${fruit.price}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-green-600">Không có sản phẩm gợi ý</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;