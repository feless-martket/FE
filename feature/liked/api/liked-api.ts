import { ProductResponseDto } from "@/feature/landing/section/bestSection/bestProductService";
import myApi from "@/lib/axios";

// 찜한 상품 목록 조회
export const getLikedProducts = async (
  username: string
): Promise<ProductResponseDto[]> => {
  const res = await myApi.get<ProductResponseDto[]>(`/like/member/${username}`);
  return res.data;
};

interface LikeResponseDto {
  success: boolean;
  message: string;
  likeCount: number;
}

// 상품 좋아요 수 조회
export const getLikeCount = async (productId: number) => {
  const res = await myApi.get(`/like/product/${productId}`);
  return res.data;
};

// 찜 추가
export const addLike = async (
  username: string,
  productId: number
): Promise<LikeResponseDto> => {
  const res = await myApi.post<LikeResponseDto>("/like", {
    username,
    productId,
  });
  return res.data;
};

// 찜 취소
export const cancelLike = async (
  username: string,
  productId: number
): Promise<LikeResponseDto> => {
  const res = await myApi.delete<LikeResponseDto>("/like", {
    data: { username, productId },
  });
  return res.data;
};

// 찜 여부 확인
export const checkIsLiked = async (
  username: string,
  productId: number
): Promise<boolean> => {
  const res = await myApi.get<boolean>("/like/check", {
    params: {
      username,
      productId,
    },
  });
  return res.data;
};
