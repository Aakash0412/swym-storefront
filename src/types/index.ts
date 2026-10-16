export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  availableColors: string[];
  availableSizes: string[];
  description?: string;
}

export interface Wishlist {
  id: string;
  name: string;
  productIds: string[];
  createdAt: number;
  updatedAt: number;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc';

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
}

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  undoAction?: () => void;
  undoLabel?: string;
  duration?: number;
}
