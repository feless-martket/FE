//  npm install qs
import myApi from "@/lib/axios";
import qs from "qs";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  imgurl: string;
  product_status: string | null;
  discount?: number; // 할인
  delivery?: string[]; // 배송
}

// 검색 API (일반 검색)
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

// 추천 검색어 API
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

// 모든 상품 가져오기 API
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

// 상품 목록 조회 API
export const fetchProducts = async (category: string) => {
  try {
    const response = await myApi.get(
      `/product/category/${encodeURIComponent(category)}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchProductsByMainCategory = async (mainCategory: string) => {
  try {
    const response = await myApi.get(
      `/product/main-category/${encodeURIComponent(mainCategory)}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch products by main category:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 백엔드의 SearchRequestDto와 매핑됨
export interface FilterParams {
  keyword?: string;
  mainCategory?: string[];
  subCategory?: string[];
  delivery?: string[];
  priceMin?: number;
  priceMax?: number;
}

/**
 * (필터 적용) 키워드 + 여러 카테고리 등을 GET 쿼리 파라미터로 전송
 * /search/results/filter 엔드포인트
 */
export async function fetchFilteredProducts(
  params: FilterParams
): Promise<Product[]> {
  try {
    const response = await myApi.get<Product[]>("/search/results/filter", {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "필터 검색 API 호출 실패",
      error.response?.data || error.message
    );
    throw new Error("필터 검색 API 호출 실패");
  }
}
