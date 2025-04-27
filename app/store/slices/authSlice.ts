// store/authSlice.ts
'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, User, Credentials, AuthResponse } from "../types";
import Cookies from "js-cookie";
import axios from "axios";
import { BaseURL } from "@/app/utils/baseUrl";

export const login = createAsyncThunk<boolean, Credentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BaseURL.auth}/login`, {
        username: credentials.username,
        password: credentials.password,
      });
      if (res.status !== 200) throw new Error("Đăng nhập thất bại");
      const data: AuthResponse = await res.data.data;
      console.log(data);

      Cookies.set("token", data.token, { secure: true, sameSite: "strict" });
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Đăng nhập thất bại");
    }
  }
);

export const fetchUserData = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) throw new Error("Chưa đăng nhập");
    try {
      const res = await axios.get(`${BaseURL.auth}/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status !== 200) throw new Error("Token không hợp lệ");
      return await res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Lỗi khi tải dữ liệu người dùng");
    }
  }
);
export const checkAuthOnStart = createAsyncThunk<User | null, void, { rejectValue: string }>(
  "auth/checkAuthOnStart",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) return null; // Nếu không có token thì trả về null
    try {
      const res = await axios.get(`${BaseURL.auth}/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status !== 200) throw new Error("Token không hợp lệ");
      return res.data; // Trả về thông tin người dùng nếu token hợp lệ
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Lỗi khi kiểm tra token");
    }
  }
);
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("token");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthOnStart.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuthOnStart.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload ?? "Lỗi khi kiểm tra token";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ?? "Lỗi không xác định";
        state.loading = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
