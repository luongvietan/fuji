'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { fetchFruitById, Fruit, FruitState } from '@/app/store/slices/fruitSlice';
import { addToCart } from '@/app/store/slices/cartSlice';
import { AppDispatch, RootState } from '@/app/store';
import { BaseURL } from '@/app/utils/baseUrl';

// Hàm sinh màu nền ngẫu nhiên cho tags
const getRandomColor = () => {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-red-100 text-red-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProductDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { selectedFruit, loading, error } = useSelector<RootState, FruitState>(
    (state) => state.fruit
  );
  const cartLoading = useSelector<RootState, boolean>((state) => state.cart.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchFruitById(Number(id)));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (selectedFruit) {
      dispatch(addToCart({ fruitId: selectedFruit.id, quantity: 1, fruitName: selectedFruit.name, fruitCategory: selectedFruit.categories, fruitPrice: selectedFruit.price, image: selectedFruit.image }));
    }
  };

  if (loading) return <div className="text-center py-20">Đang tải...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Lỗi: {error}</div>;
  if (!selectedFruit) return <div className="text-center py-20">Không tìm thấy sản phẩm</div>;

  return (
    <div className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hình ảnh sản phẩm */}
          <div className="relative w-full h-[400px]">
            <Image
              src={`${BaseURL.baseImage}${selectedFruit.image}` || '/placeholder.svg'}
              alt={selectedFruit.name}
              fill
              className="object-cover rounded-lg"
            />
            {selectedFruit.discount > 0 && (
              <div className="absolute top-4 left-4 bg-yellow-400 text-sm font-semibold px-3 py-1 rounded-full">
                Giảm {selectedFruit.discount * 100}%
              </div>
            )}
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-800">{selectedFruit.name}</h1>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.round(selectedFruit.averageRating) }).map((_, i) => (
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

            <div className="text-2xl font-semibold text-gray-800">
              {selectedFruit.discount > 0 ? (
                <>
                  <span className="line-through text-gray-500 mr-2">${selectedFruit.price}</span>
                  <span className="text-red-500">
                    ${(selectedFruit.price * (1 - selectedFruit.discount)).toFixed(2)}
                  </span>
                </>
              ) : (
                <span>${selectedFruit.price}</span>
              )}
            </div>

            {/* Mô tả sản phẩm */}


            {/* Thông tin chi tiết */}
            <div className="flex flex-col gap-2">
              <p>
                <span className="font-medium">Danh mục:</span>{' '}
                {selectedFruit.categories.map((cat) => cat.name).join(', ')}
              </p>
              <p className="flex gap-2 items-center flex-wrap">
                {selectedFruit.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getRandomColor()}`}
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
              className={`mt-4 px-6 py-2 bg-[#269300] text-white rounded-md hover:bg-[#1e7a00] transition-colors duration-200 ${selectedFruit.stockStatus === 'OUT_OF_STOCK' || cartLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {cartLoading ? 'Đang xử lý...' : 'Thêm vào giỏ hàng'}
            </button>
          </div>

        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow m-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Mô tả sản phẩm</h2>
          <p className="text-gray-600 leading-relaxed">{selectedFruit.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;