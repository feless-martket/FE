import myApi from "@/lib/axios";
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  imgurl: string;
  product_status: string | null;
}

// ✅ 검색 API (일반 검색)
export async function searchProducts(keyword: string): Promise<Product[]> {
  try {
    const response = await myApi.get<Product[]>("/search/results", {
      params: { keyword },
    });
    return response.data;
  } catch (error: any) {
    console.error("검색 API 호출 실패", error.response?.data || error.message);
    throw new Error("검색 API 호출 실패");
  }
}

// ✅ 추천 검색어 API
export async function getSuggestions(keyword: string): Promise<string[]> {
  try {
    const response = await myApi.get<string[]>("/search/suggestions", {
      params: { keyword },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "추천 검색어 API 호출 실패",
      error.response?.data || error.message
    );
    throw new Error("추천 검색어 API 호출 실패");
  }
}

// ✅ 모든 상품 가져오기 API
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await myApi.get<Product[]>("/product");
    return response.data;
  } catch (error: any) {
    console.error(
      "모든 상품 가져오기 API 호출 실패",
      error.response?.data || error.message
    );
    throw new Error("모든 상품 가져오기 API 호출 실패");
  }
}
