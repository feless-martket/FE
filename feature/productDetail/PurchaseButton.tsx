"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  addLike,
  cancelLike,
  checkIsLiked,
} from "@/feature/liked/api/liked-api";
import { Heart } from "lucide-react";

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
  const router = useRouter();
  const auth = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
  });

  const [isLiked, setIsLiked] = useState<boolean>(false);

  // 찜 상태 확인
  useEffect(() => {
    async function initLikedState() {
      if (!auth?.isLoggedIn || !auth.userInfo) return;
      try {
        const liked = await checkIsLiked(auth.userInfo.username, productId);
        setIsLiked(liked);
      } catch (error) {
        console.error("이미 찜 체크 실패:", error);
      }
    }
    initLikedState();
  }, [auth, productId]);

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

  // 좋아요(찜) 버튼 클릭 시
  const handleLikeToggle = async () => {
    console.log("현재 productId: ", productId);

    // 로그인이 되어있지 않은 경우
    if (!auth?.isLoggedIn) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      router.push("/login");
      return;
    }

    try {
      if (isLiked) {
        // 이미 찜한 상태 -> 찜 취소
        const response = await cancelLike(auth.userInfo!.username, productId);
        alert(response.message || "찜 취소가 완료되었습니다.");
        setIsLiked(false);
      } else {
        // 찜하지 않은 상태 -> 찜 추가
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
      <div className="mx-auto w-full max-w-[360px] bg-white flex items-center space-x-2">
        {/* 좋아요 버튼 (디자인 예시) */}
        <button
          onClick={handleLikeToggle}
          className="w-12 h-12 border rounded flex items-center justify-center"
        >
          <Heart
            className="w-6 h-6"
            fill={isLiked ? "green" : "none"}
            stroke="green"
          />
        </button>

        {/* 장바구니 담기 & 구매하기 버튼 */}
        <div className="flex flex-1 space-x-2">
          <button
            onClick={handleAddToCartAndNavigate}
            className="flex-1 bg-gray-500 text-white py-4 rounded"
          >
            장바구니 담기
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-green-500 text-white py-4 rounded"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
