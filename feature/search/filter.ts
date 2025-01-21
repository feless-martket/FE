export interface FilterOption {
  name: string;
  count: number;
}

export interface FilterCategory {
  카테고리: FilterOption[];
  가격: string[];
  할인율: string[];
  배송: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discount?: number;
  imageUrl: string[]; // 이미지 URL 배열
  delivery: string[];
}
