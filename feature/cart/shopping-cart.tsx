"use client";

import { Header } from "@/components/layout/header";
import { useState } from "react";

export const ShoppingCart = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 6900;
  const shippingFee = 3000;
  const totalPrice = price * quantity + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Header title="장바구니"></Header>

      <div className="mt-4">
        {/* 상품 정보 */}
        <div className="border-b pb-4">
          <div className="mb-3 flex items-center space-x-2">
            <input
              type="checkbox"
              checked
              className="form-checkbox size-5 text-green-500"
            />
            <p className="text-sm text-gray-600">전체 선택 (1/1)</p>
            <button className="text-sm text-gray-500">선택삭제</button>
          </div>
          <div className="flex space-x-4">
            <img
              src="/img/baseball3.jpg" // 이미지 경로 수정 필요
              alt="상품 이미지"
              className="size-16 rounded-md border"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">
                [하키스] 2023 네이처썸머 팬티형 기저귀 1박스 3종 (택1)
              </p>
              <p className="mt-1 text-sm text-gray-700">
                {price.toLocaleString()}원
              </p>
              <div className="mt-2 flex items-center">
                <button
                  className="size-8 rounded border text-gray-700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <p className="px-4">{quantity}</p>
                <button
                  className="size-8 rounded border text-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button className="text-gray-400">✕</button>
          </div>
        </div>

        {/* 가격 정보 */}
        <div className="mt-4 text-sm text-gray-600">
          <div className="mb-2 flex justify-between">
            <p>상품금액</p>
            <p>{(price * quantity).toLocaleString()}원</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>상품할인금액</p>
            <p>0원</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>배송비</p>
            <p>{shippingFee.toLocaleString()}원</p>
          </div>
          <div className="mt-2 flex justify-between font-bold text-gray-800">
            <p>결제예정금액</p>
            <p>{totalPrice.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      {/* 결제 버튼 */}
      <div className="mt-6">
        <button className="w-full rounded-md bg-green-500 py-3 text-lg font-bold text-white">
          {totalPrice.toLocaleString()}원 결제하기
        </button>
      </div>
    </div>
  );
};
