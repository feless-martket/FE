// fetchProductsByDiscountStatus.ts
import myApi from "@/lib/axios";

export interface ProductPageResponse {
  content: any[];
  totalElements: number;
}

export async function fetchProductsByDiscountStatus(
  discountStatus: string,
  page: number,
  size: number,
  sortOption: string,
  direction: string,
): Promise<ProductPageResponse> {
  const response = await myApi.get("/product/discount", {
    params: {
      discountStatus,
      page,
      size,
      sortOption,
      direction,
    },
  });
  return response.data;
}
