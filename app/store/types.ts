// Định nghĩa kiểu cho Profile
export interface Profile {
    name: string;
    email: string;
    address?: string;
  }
  
  // Định nghĩa kiểu cho Cart Item
  export interface CartItem {
    id: number;
    product: string;
    quantity: number;
    price: number;
  }
  
  // Định nghĩa kiểu cho Order
  export interface Order {
    id: number;
    items: string[];
    status: string;
    total: number;
  }
  
  // Định nghĩa kiểu cho User
  export interface User {
    profile: Profile;
    cart: CartItem[];
    orders: Order[];
  }
  export interface VerifyState {
    status: "success"; 
    message: string;  
    data: {
      username: string;
      roles: string[];
    };
  }
  
  
  // Định nghĩa kiểu cho Auth State
  export interface AuthState {
    role: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
  // Định nghĩa kiểu cho Cart State
  export interface CartState {
    cart: CartItem[];
  }
  
  // Định nghĩa kiểu cho Profile State
  export interface ProfileState {
    profile: Profile | null;
  }
  
  // Định nghĩa kiểu cho Order State
  export interface OrderState {
    orders: Order[];
  }
  
  // Định nghĩa kiểu cho API response
  export interface AuthResponse {
    token: string;
  }
  
  // Định nghĩa kiểu cho Credentials
  export interface Credentials {
    username: string;
    password: string;
  }