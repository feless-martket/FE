// npm install qs
import myApi from "@/lib/axios";
import qs from "qs";
import { Product } from "@/feature/search/filter";
// SearchResponseDto는 백엔드의 응답 구조와 일치하도록 정의된 TypeScript 인터페이스여야 함

export interface FilterParams {
  keyword?: string;
  mainCategory?: string[];
  subCategory?: string[];
  delivery?: string[];
  priceMin?: number;
  priceMax?: number;
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
export const fetchProducts = async (category: string): Promise<Product[]> => {
  try {
    const response = await myApi.get<Product[]>(
      `/product/category/${encodeURIComponent(category)}?page=${page}&size=${size}`
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

export const fetchProductsByMainCategory = async (
  mainCategory: string
): Promise<Product[]> => {
  try {
    const response = await myApi.get<Product[]>(
      `/product/main-category/${encodeURIComponent(mainCategory)}?page=${page}&size=${size}`
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

    console.log("Raw DTO response:", JSON.stringify(response.data, null, 2));
    return response.data; // Product 배열 그대로 반환
  } catch (error: any) {
    console.error(
      "필터 검색 API 호출 실패",
      error.response?.data || error.message
    );
    throw new Error("필터 검색 API 호출 실패");
  }
}
