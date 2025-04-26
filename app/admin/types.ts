// types.ts
export interface Fruit {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  tags: string[];
}

export interface PaginatedFruits {
  content: Fruit[];
  totalPages: number;
  totalElements: number;
}
