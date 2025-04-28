import { BaseURL } from '@/app/utils/baseUrl';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Định nghĩa các interface cho dữ liệu
interface Category {
  id: number;
  name: string;
  description: string | null;
}

interface Fruit {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  categories: Category[];
  tags: string[];
  importDate: string;
  origin: string;
  weight: number;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  averageRating: number;
  discount: number;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface FruitResponse {
  content: Fruit[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

interface FruitState {
 fruits: Fruit[];
  selectedFruit: Fruit | null;
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
  };
  loading: boolean;
  error: string | null;
}

const API_BASE_URL = BaseURL.fruit;

// Async thunk để lấy thông tin hoa quả theo ID
export const fetchFruitById = createAsyncThunk<Fruit, number, { rejectValue: string }>(
  'fruit/fetchFruitById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk để lấy danh sách tất cả hoa quả (phân trang)
export const fetchAllFruits = createAsyncThunk<
  FruitResponse,
  { page?: number; size?: number },
  { rejectValue: string }
>(
  'fruit/fetchAllFruits',
  async ({ page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: { page, size },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk để tìm kiếm hoa quả theo tên (phân trang)
export const searchFruitsByName = createAsyncThunk<
  FruitResponse,
  { name: string; page?: number; size?: number },
  { rejectValue: string }
>(
  'fruit/searchFruitsByName',
  async ({ name, page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { name, page, size },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk để lấy danh sách hoa quả theo danh mục
export const fetchFruitsByCategory = createAsyncThunk<
  FruitResponse,
  { categoryName: string; page?: number; size?: number },
  { rejectValue: string }
>(
  'fruit/fetchFruitsByCategory',
  async ({ categoryName, page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${encodeURIComponent(categoryName)}`, {
        params: { page, size },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Tạo fruitSlice
const fruitSlice = createSlice({
  name: 'fruit',
  initialState: {
    fruits: [],
    selectedFruit: null,
    pagination: {
      pageNumber: 0,
      pageSize: 10,
      totalPages: 1,
      totalElements: 0,
      last: true,
      first: true,
    },
    loading: false,
    error: null,
  } as FruitState,
  reducers: {
    clearSelectedFruit: (state) => {
      state.selectedFruit = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Xử lý fetchFruitById
    builder
      .addCase(fetchFruitById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFruitById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFruit = action.payload;
      })
      .addCase(fetchFruitById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });

    // Xử lý fetchAllFruits
    builder
      .addCase(fetchAllFruits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFruits.fulfilled, (state, action) => {
        state.loading = false;
        state.fruits = action.payload.content;
        state.pagination = {
          pageNumber: action.payload.pageable.pageNumber,
          pageSize: action.payload.pageable.pageSize,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
          last: action.payload.last,
          first: action.payload.first,
        };
      })
      .addCase(fetchAllFruits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });

    // Xử lý searchFruitsByName
    builder
      .addCase(searchFruitsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFruitsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.fruits = action.payload.content;
        state.pagination = {
          pageNumber: action.payload.pageable.pageNumber,
          pageSize: action.payload.pageable.pageSize,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
          last: action.payload.last,
          first: action.payload.first,
        };
      })
      .addCase(searchFruitsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });

    // Xử lý fetchFruitsByCategory
    builder
      .addCase(fetchFruitsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFruitsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.fruits = action.payload.content;
        state.pagination = {
          pageNumber: action.payload.pageable.pageNumber,
          pageSize: action.payload.pageable.pageSize,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
          last: action.payload.last,
          first: action.payload.first,
        };
      })
      .addCase(fetchFruitsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

// Export actions
export const { clearSelectedFruit, clearError } = fruitSlice.actions;

// Export reducer
export default fruitSlice.reducer;

// Export types để sử dụng trong các component
export type { Fruit, Category, FruitResponse, FruitState };