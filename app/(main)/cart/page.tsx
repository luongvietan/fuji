'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import {
  fetchCart,
  plusCartItem,
  minusCartItem,
  removeCartItem,
  checkoutCart,
  clearCart,
  CartState,
} from '@/app/store/slices/cartSlice';
import { AppDispatch, RootState } from '@/app/store';
import { BaseURL } from '@/app/utils/baseUrl';

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading, error } = useSelector<RootState, CartState>((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  const subtotal = cart?.items.reduce((total, item) => total + item.fruitPrice * item.quantity, 0) || 0;
  const shipping = 30000;
  const total = subtotal + shipping;

  const handlePlusItem = (fruitId: number) => {
    dispatch(plusCartItem(fruitId));
  };

  const handleMinusItem = (fruitId: number) => {
    dispatch(minusCartItem(fruitId));
  };
  const handleRemoveItem = (fruitId: number) => {
    dispatch(removeCartItem(fruitId));
  };

  const handleCheckout = () => {
    dispatch(checkoutCart());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(fetchCart()); 
  };

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-[#269300]">Giỏ hàng của bạn</h1>

        {loading && <div className="text-center py-8">Đang tải...</div>}
        {error && <div className="text-center py-8 text-red-500">Lỗi: {error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Sản phẩm ({cart?.items.length || 0})</h2>
              </div>

              {cart && cart.items.length > 0 ? (
                <div>
                  {cart.items.map((item) => (
                    <div key={item.id} className="p-4 border-b flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={`${BaseURL.baseImage}${item.image}` || '/placeholder.svg'}
                          alt={item.fruitName}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.fruitName}</h3>
                        <p className="text-[#269300] font-semibold mt-1">{formatPrice(item.fruitPrice)}</p>
                        <p className="text-gray-500 text-sm">{item.fruitCategory}</p>
                      </div>
                      <div className="flex items-center border rounded-md">
                        <button
                          className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          onClick={() => handleMinusItem(item.fruitId)}
                          disabled={loading}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          onClick={() => handlePlusItem(item.fruitId)}
                          disabled={loading}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="font-semibold">{formatPrice(item.fruitPrice * item.quantity)}</p>
                        <button
                          className="text-red-500 mt-2 flex items-center text-sm hover:underline disabled:opacity-50"
                          onClick={() => handleRemoveItem(item.fruitId)}
                          disabled={loading}
                        >
                          <Trash2 size={14} className="mr-1" />
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
                  <Link
                    href="/fruits"
                    className="mt-4 inline-block bg-[#269300] text-white px-4 py-2 rounded-md hover:bg-[#1e7a00]"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
              )}

              <div className="p-4 bg-gray-50 flex justify-between">
                <Link href="/products" className="text-[#269300] hover:underline flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Tiếp tục mua sắm
                </Link>
                <button
                  className="text-red-500 hover:underline flex items-center disabled:opacity-50"
                  onClick={handleClearCart}
                  disabled={loading || !cart || cart.items.length === 0}
                >
                  <Trash2 size={16} className="mr-1" />
                  Xóa tất cả
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Tổng đơn hàng</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">{formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold">Tổng cộng:</span>
                  <span className="font-bold text-[#269300]">{formatPrice(total)}</span>
                </div>

                <button
                  className="w-full bg-[#269300] text-white py-3 rounded-md hover:bg-[#1e7a00] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCheckout}
                  disabled={loading || !cart || cart.items.length === 0}
                >
                  {loading ? 'Đang xử lý...' : 'Tiến hành thanh toán'}
                </button>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Chúng tôi chấp nhận:</h3>
                  <div className="flex gap-2">
                    <div className="border rounded p-1 w-12 h-8 flex items-center justify-center bg-gray-100">
                      <span className="text-xs">VISA</span>
                    </div>
                    <div className="border rounded p-1 w-12 h-8 flex items-center justify-center bg-gray-100">
                      <span className="text-xs">MC</span>
                    </div>
                    <div className="border rounded p-1 w-12 h-8 flex items-center justify-center bg-gray-100">
                      <span className="text-xs">MOMO</span>
                    </div>
                    <div className="border rounded p-1 w-12 h-8 flex items-center justify-center bg-gray-100">
                      <span className="text-xs">COD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden mt-4 p-4">
              <h3 className="font-medium mb-2">Mã giảm giá</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="flex-grow border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#269300]"
                />
                <button className="bg-[#269300] text-white px-4 py-2 rounded-r-md hover:bg-[#1e7a00]">
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;