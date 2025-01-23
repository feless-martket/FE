"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Heart } from "lucide-react";
import {
  addLike,
  cancelLike,
  checkIsLiked,
} from "@/feature/liked/api/liked-api";
import myApi from "@/lib/axios"; // 전역 인터셉터가 있는 axios 인스턴스
// import axios from "axios"; // 개별 인스턴스를 굳이 쓸 필요가 없다면 주석처리

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

  // 찜 상태
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // 컴포넌트 마운트 시, 이미 찜했는지 확인
  useEffect(() => {
    async function initLikedState() {
      if (!auth?.isLoggedIn) return; // 로그인 안된 상태면 체크 불필요
      if (!auth?.userInfo?.username) return; // username이 없으면 패스

      try {
        const liked = await checkIsLiked(auth.userInfo.username, productId);
        setIsLiked(liked);
      } catch (error) {
        console.error("이미 찜했는지 확인 중 오류:", error);
      }
    }

    initLikedState();
  }, [auth, productId]);

  // 장바구니 추가 로직
  const handleAddToCartAndNavigate = async () => {
    try {
      const response = await myApi.post("/cart", {
        cartItemId,
        quantity: 1,
      });
      if (response.status === 200) {
        alert("상품이 장바구니에 추가되었습니다.");
        router.push("/cart");
      }
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생:", error);
      alert("장바구니에 담는 데 실패했습니다.");
    }
  };

  // 구매하기 로직
  const handleBuyNow = () => {
    alert("구매하기 로직을 구현하세요!");
    // 예: 결제 페이지로 이동 etc.
  };

  // 찜 추가/취소 토글
  const handleLikeToggle = async () => {
    console.log("현재 productId: ", productId);

    // 로그인 체크
    if (!auth?.isLoggedIn) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      router.push("/login");
      return;
    }

    try {
      if (isLiked) {
        // 이미 찜 => 찜 취소
        const response = await cancelLike(auth.userInfo!.username, productId);
        alert(response.message || "찜 취소가 완료되었습니다.");
        setIsLiked(false);
      } else {
        // 아직 찜 안 됨 => 찜 추가
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
        {/* 좋아요(찜) 버튼 */}
        <button
          onClick={handleLikeToggle}
          className="flex w-12 h-12 items-center justify-center rounded border"
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
