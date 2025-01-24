"use client";

import { addToCart } from "@/feature/productDetail/ProductDetailButton-api"; // addToCart 함수 임포트
import { useRouter } from "next/navigation";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Heart } from "lucide-react";
import {
  checkIsLiked,
  getLikeCount,
  cancelLike,
  addLike,
} from "@/feature/liked/api/liked-api";
import { SecondModal } from "@/components/modal/secondmodal";

interface PurchaseButtonProps {
  cartItemId: number;
  productId: number;
  productStatus: "AVAILABLE" | "UNAVAILABLE";
}

export default function PurchaseButton({
  cartItemId,
  productId,
  productStatus,
}: PurchaseButtonProps) {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
  });

  // 찜 여부 & 찜 갯수
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  // "로그인이 필요합니다" 모달 상태
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 초기 로드 시 찜 상태 세팅
  useEffect(() => {
    async function initLikedState() {
      if (!auth?.isLoggedIn || !auth.userInfo) return;
      try {
        const liked = await checkIsLiked(auth.userInfo.username, productId);
        setIsLiked(liked);
        const count = await getLikeCount(productId);
        setLikeCount(count);
      } catch (error) {
        console.error("좋아요 상태 초기화 실패", error);
      }
    }
    initLikedState();
  }, [auth, productId]);

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const handleAddToCartAndNavigate = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      const response = await addToCart(cartItemId, 1, token);

      if (response.status === 200) {
        alert("상품이 장바구니에 추가되었습니다.");
        router.push("/cart");
      }
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          alert("권한이 없습니다. 로그인 상태를 확인하세요.");
        } else {
          alert("장바구니에 담는 데 실패했습니다.");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleBuyNow = () => {
    alert("구매하기 로직을 구현하세요!");
  };

  const handleLikeToggle = async () => {
    if (!auth?.isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (isLiked) {
        const response = await cancelLike(auth.userInfo!.username, productId);
        // alert(response.message || "찜 취소가 완료되었습니다.");
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        const response = await addLike(auth.userInfo!.username, productId);
        // alert(response.message || "찜 추가가 완료되었습니다.");
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error: any) {
      console.error("찜 토글 실패:", error);
      alert("찜 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-10 bg-gray-100">
      <div className="mx-auto w-full max-w-[360px] bg-white">
        <div className="flex items-center gap-3 px-4 py-3">
          {/* 찜하기 버튼 */}
          <button
            onClick={handleLikeToggle}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 hover:border-green-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label={isLiked ? "찜 취소하기" : "찜하기"}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isLiked
                  ? "fill-green-500 text-green-500 scale-110"
                  : "text-gray-400 hover:text-green-500"
              }`}
            />
            <span className="mt-1 text-xs font-medium text-gray-600">
              {likeCount}
            </span>
          </button>

          {/* 장바구니 담기 버튼 */}
        {productStatus === "UNAVAILABLE" ? (
          <button
            className="flex-1 bg-gray-400 text-white py-4 rounded cursor-not-allowed"
            disabled
          >
            현재 품절된 상품입니다.
          </button>
        ) : (
              <button
              onClick={handleAddToCartAndNavigate}
              className="flex-1 bg-gray-50 text-gray-700 py-3.5 px-4 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              장바구니 담기
            </button>

          {/* 구매하기 버튼 */}
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-500 text-white py-3.5 px-4 rounded-full text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              구매하기
            </button>
          </div>
        )}
      </div>
      <SecondModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="로그인이 필요합니다."
        description="로그인 페이지로 이동하시겠습니까?"
        confirmText="확인"
        cancelText="취소"
        onConfirm={() => {
          setShowLoginModal(false);
          router.push("/login");
        }}
      />
    </div>
  );
}
