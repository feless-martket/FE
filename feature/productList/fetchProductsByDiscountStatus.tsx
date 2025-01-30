import myApi from "@/lib/axios";

export async function fetchProductsByDiscountStatus(
  discountStatus: string,
  page: number,
  size: number,
) {
  // 서버와의 통신 로직. 아래는 예시 URL이므로 실제 서버에 맞춰 수정
  const response = await myApi.get("/product/discount", {
    params: {
      discountStatus,
      page,
      size,
    },
  });
  return response.data; // { content: [], totalElements: number, ... }
}
