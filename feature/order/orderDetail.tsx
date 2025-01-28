"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { OrderList } from "@/app/order/page";
import { parse, format } from "date-fns";

interface OrderDetailProps {
  order: OrderList;
  onBack: () => void;
}

export default function OrderDetail({ order, onBack }: OrderDetailProps) {
  const parsedDate = parse(
    order.orderDate,
    "yyyy-MM-dd'T'HH:mm:ss.SSSSSS",
    new Date(),
  );
  const formattedDate = format(parsedDate, "yyyy.MM.dd (HH시 mm분)");

  const orderDetail = {
    orderDate: formattedDate,
    orderNumber: order.tossOrderID,
    status: order.orderStatus,
    deliveryInfo: {
      recipient: order.memberInfos.name,
      phone: order.memberInfos.phone,
      address: order.memberInfos.address,
      deatilAddress: order.memberInfos.detailAddress,
      postalCode: order.memberInfos.postalCode,
      request: order.memberInfos.deliveryNote,
    },
    payment: {
      method: order.paymentMethod,
      totalPrice: order.totalPrice - 3000,
      shippingFee: 3000,
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
            주문일시: {orderDetail.orderDate}
            <br />
            주문번호: {orderDetail.orderNumber}
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
              <span>
                {orderDetail.deliveryInfo.address}
                <br />
                {orderDetail.deliveryInfo.deatilAddress}
                <br />
                {`(${orderDetail.deliveryInfo.postalCode})`}
              </span>
              {/* <span>{orderDetail.deliveryInfo.deatilAddress}</span> */}
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
          <div className="space-y-2 rounded-lg border p-4">
            {order.products.map((prod) => (
              <div key={prod.id} className="text-sm">
                <div className="font-medium">{prod.name}</div>
                <div className="text-gray-600">
                  {prod.price.toLocaleString()}원 · {prod.quantity}개
                </div>
              </div>
            ))}
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
