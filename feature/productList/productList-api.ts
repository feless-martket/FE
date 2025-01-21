// API 클라이언트
import myApi from "@/lib/axios";

export const fetchProducts = async (
  subCategory: string,
  page: number,
  size: number
) => {
  try {
    const response = await myApi.get(
      `/product/category/${encodeURIComponent(subCategory)}?page=${page}&size=${size}`
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
  mainCategory: string,
  page: number,
  size: number
) => {
  try {
    const response = await myApi.get(
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
