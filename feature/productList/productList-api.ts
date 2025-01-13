// API 클라이언트
import myApi from "@/lib/axios";
import { baseURL } from "@/lib/axios";

// 상품 목록 조회 API
export const fetchProducts = async (Category: string) => {
  if (Category == "VEGETABLE") {
    try {
      const response = await myApi.get(
        baseURL + `/product/main-category/${Category}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch products:",
        error.response?.data || error.message,
      );
      throw error;
    }
  } else {
    try {
      const response = await myApi.get(
        baseURL + `/product/category/${Category}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch products:",
        error.response?.data || error.message,
      );
      throw error;
    }
  }
};
