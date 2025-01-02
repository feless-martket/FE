import axios from "axios";

// API 클라이언트 생성
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 상품 목록 조회 API
export const fetchProducts = async (category: string) => {
  try {
    const response = await apiClient.get("/products", {
      params: { category },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch products:",
      error.response?.data || error.message
    );
    throw error;
  }
};
