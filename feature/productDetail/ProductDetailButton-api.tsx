import myApi from "@/lib/axios";

// 장바구니에 상품 추가 함수
export const addToCart = async (
  cartItemId: number,
  quantity: number,
  token: string
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await myApi.post(
      "/cart",
      {
        cartItemId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
