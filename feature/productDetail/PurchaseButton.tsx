"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

// cartItemId를 prop으로 받아온다고 가정
// 상품 상세 페이지에서 <PurchaseButton cartItemId={원하는아이디}/> 형태로 사용
interface PurchaseButtonProps {
  cartItemId: number;
}

export default function PurchaseButton({ cartItemId }: PurchaseButtonProps) {
  const router = useRouter();
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

  return (
    <div className="fixed inset-x-0 bottom-10 z-10 bg-gray-100 pb-[16px]">
      <div className="mx-auto w-full max-w-[360px] bg-white flex items-center space-x-2">
        {/* 좋아요 버튼 (디자인 예시) */}
        <button className="w-12 h-12 border rounded flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="green"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364l-7.07 7.07a.75.75 0 01-1.06 0l-7.07-7.07a4.5 4.5 0 010-6.364z"
            />
          </svg>
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
