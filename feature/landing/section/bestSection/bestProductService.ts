import myApi from "@/lib/axios";

// services/productService.ts

/**
 * ProductResponseDto 인터페이스 정의
 * 별도 파일로 분리하는 것이 권장되지만, 사용자의 요청에 따라 이 파일 내에 정의했습니다.
 */

interface Option {
  value: string;
  label: string;
}

export const deliveries: Option[] = [
  { value: "GENERAL_DELIVERY", label: "일반배송" },
  { value: "EARLY_DELIVERY", label: "새벽배송" },
  { value: "SELLER_DELIVERY", label: "판매자배송" },
];
export interface ProductResponseDto {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  discount?: number | null;
  productStatus: "AVAILABLE" | "UNAVAILABLE";
  delivery: "GENERAL_DELIVERY" | "EARLY_DELIVERY" | "SELLER_DELIVERY";
  imageUrls: string[];
  likeCount: number;
}

/**
 * 좋아요 수가 많은 상위 N개의 상품을 가져오는 함수
 * @param limit 조회할 상위 상품의 개수
 * @returns ProductResponseDto 배열
 */
export const fetchBestLikedProducts = async (
  limit: number
): Promise<ProductResponseDto[]> => {
  try {
    const response = await myApi.get<ProductResponseDto[]>(
      "/product/best-liked",
      {
        params: { limit },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching best liked products:", error);
    throw error;
  }
};

/**
 * 찜하기(Like) 기능을 수행하는 함수 (현재 사용하지 않음)
 * @param productId 찜하기할 상품의 ID
 * @returns 업데이트된 ProductResponseDto
 */
export const likeProduct = async (
  productId: number
): Promise<ProductResponseDto> => {
  try {
    const response = await myApi.post<ProductResponseDto>(
      `/product/${productId}/like`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error liking the product:", error);
    throw error;
  }
};
