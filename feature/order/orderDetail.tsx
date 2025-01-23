"use client";

import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
}

export default function OrderDetail({ orderId, onBack }: OrderDetailProps) {
  const orderDetail = {
    orderDate: "2023.06.11 01:05",
    orderNumber: "2288291924",
    status: "배송완료",
    deliveryInfo: {
      recipient: "홍길동",
      phone: "010-1234-5678",
      address: "서울특별시 강남구 테헤란로 123 456동 789호",
      request: "문 앞에 놓아주세요",
    },
    product: {
      name: "[롤렉스] 제주 슈퍼드 모짜렐라 치즈 (100g X 3)",
      price: 53365,
      quantity: 1,
    },
    payment: {
      method: "신용카드",
      cardInfo: "신한카드 1234",
      totalPrice: 53365,
      shippingFee: 0,
    },
  };

  return (
    <div className="mx-auto min-h-screen w-[360px] bg-white">
      {/* Header */}

      <div className="space-y-6 p-4">
        {/* Order Status */}
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 text-lg font-medium">{orderDetail.status}</div>
          <div className="text-sm text-gray-600">
            주문일시 {orderDetail.orderDate}
            <br />
            주문번호 {orderDetail.orderNumber}
          </div>
        </div>

        {/* Delivery Info */}
        <div>
          <h2 className="mb-3 font-medium">배송지 정보</h2>
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="w-20 text-gray-600">받는분</span>
              <span>{orderDetail.deliveryInfo.recipient}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-600">연락처</span>
              <span>{orderDetail.deliveryInfo.phone}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-600">주소</span>
              <span>{orderDetail.deliveryInfo.address}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-600">배송요청</span>
              <span>{orderDetail.deliveryInfo.request}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Product Info */}
        <div>
          <h2 className="mb-3 font-medium">주문상품</h2>
          <div className="rounded-lg border p-4">
            <div className="mb-3 font-medium">{orderDetail.product.name}</div>
            <div className="text-sm text-gray-600">
              {orderDetail.product.price.toLocaleString()}원 ·{" "}
              {orderDetail.product.quantity}개
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div>
          <h2 className="mb-3 font-medium">결제정보</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">결제방법</span>
              <span>{orderDetail.payment.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">카드정보</span>
              <span>{orderDetail.payment.cardInfo}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between">
              <span className="text-gray-600">상품금액</span>
              <span>{orderDetail.payment.totalPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">배송비</span>
              <span>{orderDetail.payment.shippingFee.toLocaleString()}원</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between pb-4 font-medium">
              <span>총 결제금액</span>
              <span>
                {(
                  orderDetail.payment.totalPrice +
                  orderDetail.payment.shippingFee
                ).toLocaleString()}
                원
              </span>
            </div>
            <Button
              className="h-9  w-16 bg-red-500 text-white"
              onClick={onBack}
            >
              뒤로 가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
