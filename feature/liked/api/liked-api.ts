import myApi from "@/lib/axios";

// 찜한 상품 목록 조회
export const getLikedProducts = async (username: string) => {
  const res = await myApi.get(`/like/member/${username}`);
  return res.data;
};

// 상품 좋아요 수 조회
export const getLikeCount = async (productId: number) => {
  const res = await myApi.get(`/like/product/${productId}`);
  return res.data;
};

// 찜 추가
export const addLike = async (username: string, productId: number) => {
  const res = await myApi.post("/like", { username, productId });
  return res.data;
};

// 찜 취소
export const cancelLike = async (username: string, productId: number) => {
  const res = await myApi.delete("/like", {
    data: { username, productId },
  });
  return res.data;
};
