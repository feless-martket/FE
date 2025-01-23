"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Heart } from "lucide-react";
import { addLike, cancelLike } from "@/feature/liked/api/liked-api";
import { Message } from "../../node_modules/postcss/lib/result.d";

// cartItemId를 prop으로 받아온다고 가정
// 상품 상세 페이지에서 <PurchaseButton cartItemId={원하는아이디}/> 형태로 사용
interface PurchaseButtonProps {
  cartItemId: number;
  productId: number;
}

export default function PurchaseButton({
  cartItemId,
  productId,
}: PurchaseButtonProps) {
  console.log("PurchaseButton에 전달된 productId: ", productId);
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
  });

  // 요청 인터셉터 (토큰 자동 설정)
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

  // 장바구니에 담고 나서 바로 장바구니 화면으로 이동하는 함수
  const handleAddToCartAndNavigate = async () => {
    try {
      const response = await axiosInstance.post("/cart", {
        cartItemId,
        quantity: 1, // 기본 수량을 1로
      });

      if (response.status === 200) {
        alert("상품이 장바구니에 추가되었습니다.");
        router.push("/cart"); // 장바구니 페이지로 이동
      }
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생:", error);
      alert("장바구니에 담는 데 실패했습니다.");
    }
  };

  const handleBuyNow = () => {
    alert("구매하기 로직을 구현하세요!");
    // 예) 바로 결제 페이지로 이동하는 등
  };

  const handleLikeToggle = async () => {
    console.log("현재 productId: ", productId);
    // 로그인이 되어있지 않은 경우
    if (!auth?.isLoggedIn) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      router.push("/login"); // 로그인 페이지로 이동
      return;
    }

    try {
      if (isLiked) {
        // 이미 찜한 상태라면 찜 취소
        const response = await cancelLike(auth.userInfo!.username, productId);
        alert(response.message || "찜 취소가 완료되었습니다.");
        setIsLiked(false);
      } else {
        const response = await addLike(auth.userInfo!.username, productId);
        alert(response.message || "찜 추가가 완료되었습니다.");
        setIsLiked(true);
      }
    } catch (error: any) {
      console.error("찜 토글 실패:", error);
      alert("찜 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-10 bg-gray-100 pb-[16px]">
      <div className="mx-auto flex w-full max-w-[360px] items-center space-x-2 bg-white">
        {/* 좋아요 버튼 (디자인 예시) */}
        <button
          onClick={handleLikeToggle}
          className="flex size-12 items-center justify-center rounded border"
        >
          <Heart
            className="size-6"
            fill={isLiked ? "green" : "none"}
            stroke="green"
          />
        </button>

        {/* 장바구니 담기 & 구매하기 버튼 */}
        <div className="flex flex-1 space-x-2">
          <button
            onClick={handleAddToCartAndNavigate}
            className="flex-1 rounded bg-gray-500 py-4 text-white"
          >
            장바구니 담기
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 rounded bg-green-500 py-4 text-white"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
