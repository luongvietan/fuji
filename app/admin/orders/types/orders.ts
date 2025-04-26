// types/order.ts
export interface OrderItem {
  id: number;
  fruitName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderDate: Date;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  userId: number;
  orderItems: OrderItem[];
}

export type OrderInput = Omit<Order, "id">;
