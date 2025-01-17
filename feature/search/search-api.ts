export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  imageUrl: string[];
  product_status: string | null;
}

// ✅ 검색 API (일반 검색)
export async function searchProducts(keyword: string): Promise<Product[]> {
  const response = await fetch(
    `http://localhost:8080/search/results?keyword=${encodeURIComponent(keyword)}`
  );
  if (!response.ok) {
    throw new Error("검색 API 호출 실패");
  }
  return await response.json();
}

// ✅ 추천 검색어 API
export async function getSuggestions(keyword: string): Promise<string[]> {
  const response = await fetch(
    `http://localhost:8080/search/suggestions?keyword=${encodeURIComponent(keyword)}`
  );
  if (!response.ok) {
    throw new Error("추천 검색어 API 호출 실패");
  }
  return await response.json();
}

// ✅ 모든 상품 가져오기 API
export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`http://localhost:8080/product`);
  if (!response.ok) {
    throw new Error("모든 상품 가져오기 API 호출 실패");
  }
  return await response.json();
}
