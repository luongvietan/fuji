// types.ts
export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Fruit {
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
  stockStatus: string;
  averageRating: number;
  discount: number;
}

export interface FruitPOST {
  name: string;
  price: number;
  quantity: number;
  description: string;
  categories: Category[];
  tags: string[];
  importDate: string;
  origin: string;
  weight: number;
  stockStatus: string;
  averageRating: number;
  discount: number;
}

export interface PaginatedFruits {
  content: Fruit[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
