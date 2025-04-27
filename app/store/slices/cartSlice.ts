import { BaseURL } from '@/app/utils/baseUrl';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Category } from './fruitSlice';
// Định nghĩa các interface cho dữ liệu
interface CartItem {
  id: number;
  fruitId: number;
  quantity: number;
  fruitName: string;
  fruitCategory: string;
  fruitPrice: number;
  image: string;
}

interface Cart {
  id: number;
  items: CartItem[];
}

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}
interface UpdateResponse {
  fruitID: number;
}


// Base URL cho API
const API_BASE_URL = BaseURL.cart;

// Hàm lấy token từ localStorage
const getAuthToken = (): string => {
  const token = Cookies.get('token');
  return token || '';
};

// Async thunk để thêm sản phẩm vào giỏ hàng
export const addToCart = createAsyncThunk<
  Cart,
  { fruitId: number; quantity: number, fruitName: string, fruitCategory: Category[], fruitPrice: number, image: string },
  { rejectValue: string }
>('cart/addToCart', async ({ fruitId, quantity, fruitName, fruitPrice, image }, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('Vui lòng đăng nhập để thêm vào giỏ hàng');
    }

    const response = await axios.post(`${API_BASE_URL}/add`, { fruitId, quantity, fruitName, fruitPrice, image }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi thêm vào giỏ hàng');
  }
});

// Async thunk để lấy giỏ hàng
export const fetchCart = createAsyncThunk<Cart, void, { rejectValue: string }>(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('Vui lòng đăng nhập để xem giỏ hàng');
      }

      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy giỏ hàng');
    }
  }
);

export const plusCartItem = createAsyncThunk<UpdateResponse, number, { rejectValue: string }>(
  'cart/plusCartItem',
  async (fruitId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('Vui lòng đăng nhập để cập nhật giỏ hàng');
      }

      const response = await axios.put(`${API_BASE_URL}/plus/${fruitId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const newItem = {
        ...response.data.data,  
        fruitID: fruitId      
      };
      
      return newItem;
      
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tăng số lượng ');
    }
  }
);

export const minusCartItem = createAsyncThunk<UpdateResponse, number, { rejectValue: string }>(
  'cart/minusCartItem',
  async (fruitId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('Vui lòng đăng nhập để cập nhật giỏ hàng');
      }

      const response = await axios.put(`${API_BASE_URL}/minus/${fruitId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newItem = {
        ...response.data.data,  
        fruitID: fruitId      
      };
      
      return newItem;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi giảm số lượng');
    }
  }
);

export const removeCartItem = createAsyncThunk<UpdateResponse, number, { rejectValue: string }>(
  'cart/removeCartItem',
  async (fruitId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('Vui lòng đăng nhập để xóa sản phẩm');
      }

      const response = await axios.delete(`${API_BASE_URL}/remove/${fruitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newItem = {
        ...response.data.data,  
        fruitID: fruitId      
      };
      
      return newItem;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa sản phẩm');
    }
  }
);

// Async thunk để thanh toán giỏ hàng
export const checkoutCart = createAsyncThunk<void, void, { rejectValue: string }>(
  'cart/checkoutCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('Vui lòng đăng nhập để thanh toán');
      }

      await axios.post(`${API_BASE_URL}/checkout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi thanh toán');
    }
  }
);

// Tạo cartSlice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  } as CartState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Xử lý addToCart
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });

    // Xử lý fetchCart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });

    // Xử lý plusCartItem
    builder
      .addCase(plusCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(plusCartItem.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        
        state.cart?.items.forEach((item) => {
          if (item.fruitId === action.payload.fruitID) {
            item.quantity += 1;
          }
        });

      })
      .addCase(plusCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });

    // Xử lý minusCartItem
    builder
      .addCase(minusCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(minusCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart?.items.forEach((item) => {
          if (item.fruitId === action.payload.fruitID) {
            item.quantity -= 1;
          }
        });
      })
      .addCase(minusCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });

    // Xử lý removeCartItem
    builder
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        // state.cart?.items = state.cart?.items.filter((item) => item.fruitId !== action.payload.fruitID);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });

    // Xử lý checkoutCart
    builder
      .addCase(checkoutCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

// Export actions
export const { clearCart, clearError } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// Export types
export type { CartItem, Cart, CartState };