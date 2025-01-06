"use client";

import { useState } from "react";

export const ShoppingCart = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 6900;
  const shippingFee = 3000;
  const totalPrice = price * quantity + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex items-center justify-center relative border-b pb-3">
        <button className="absolute left-0 text-xl text-gray-500">✕</button>
        <h1 className="text-lg font-bold">장바구니</h1>
      </header>

      <div className="mt-4">
        {/* 상품 정보 */}
        <div className="border-b pb-4">
          <div className="flex items-center space-x-2 mb-3">
            <input
              type="checkbox"
              checked
              className="form-checkbox h-5 w-5 text-green-500"
            />
            <p className="text-sm text-gray-600">전체 선택 (1/1)</p>
            <button className="text-sm text-gray-500">선택삭제</button>
          </div>
          <div className="flex space-x-4">
            <img
              src="/img/baseball3.jpg" // 이미지 경로 수정 필요
              alt="상품 이미지"
              className="w-16 h-16 rounded-md border"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">
                [하키스] 2023 네이처썸머 팬티형 기저귀 1박스 3종 (택1)
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {price.toLocaleString()}원
              </p>
              <div className="flex items-center mt-2">
                <button
                  className="w-8 h-8 border rounded text-gray-700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <p className="px-4">{quantity}</p>
                <button
                  className="w-8 h-8 border rounded text-gray-700"
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
          <div className="flex justify-between mb-2">
            <p>상품금액</p>
            <p>{(price * quantity).toLocaleString()}원</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>상품할인금액</p>
            <p>0원</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>배송비</p>
            <p>{shippingFee.toLocaleString()}원</p>
          </div>
          <div className="flex justify-between font-bold text-gray-800 mt-2">
            <p>결제예정금액</p>
            <p>{totalPrice.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      {/* 결제 버튼 */}
      <div className="mt-6">
        <button className="w-full py-3 bg-green-500 text-white font-bold text-lg rounded-md">
          {totalPrice.toLocaleString()}원 결제하기
        </button>
      </div>
    </div>
  );
};
