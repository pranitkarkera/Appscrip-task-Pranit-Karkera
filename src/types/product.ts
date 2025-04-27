// src/types/product.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  createdAt?: string;
  outOfStock?: boolean;
  rating?: {
    rate: number;
    count: number;
  };
}
