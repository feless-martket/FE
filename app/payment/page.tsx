"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderItems } from "@/feature/payment/orderItems";
import { CustomerInfoSection } from "@/feature/payment/customerInfo";
import { DeliveryAddressSection } from "@/feature/payment/deliveryAddress";
import { DeliveryNotes } from "@/feature/payment/deliveryNote";
import { PointsSection } from "@/feature/payment/pointSection";
import { PaymentMethod } from "@/feature/payment/paymentMethod";
import type {
  CustomerInfo,
  //   DeliveryAddress,
  OrderFormData,
} from "@/feature/payment/types/orders";

export default function OrderPage() {
  const [formData, setFormData] = useState<Partial<OrderFormData>>({
    customerInfo: {
      name: "홍혁진",
      phone: "010-5547-0967",
    },
    items: [
      { id: 1, name: "[주진부마켓] 쏙쏙 ... 외 1건", price: 6900, quantity: 1 },
    ],
  });
  const [usedPoints, setUsedPoints] = useState(0);

  const isPaymentEnabled = !!(
    formData.customerInfo &&
    formData.deliveryAddress &&
    formData.items
  );

  const subtotal =
    formData.items?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ) || 0;
  const shippingFee = 3000;
  const discount = usedPoints;
  const total = subtotal + shippingFee - discount;

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-[360px] space-y-6 bg-white p-4">
        <div className="flex items-center gap-24 text-center">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="size-4" />
          </Button>
          <h1 className="text-lg font-medium">주문서</h1>
        </div>

        <OrderItems />

        <CustomerInfoSection info={formData.customerInfo as CustomerInfo} />

        <DeliveryAddressSection
          savedAddress={formData.deliveryAddress}
          onSave={(address) =>
            setFormData((prev) => ({ ...prev, deliveryAddress: address }))
          }
        />

        <DeliveryNotes />

        <PointsSection
          availablePoints={962}
          onPointsChange={(points) => setUsedPoints(points)}
        />

        <PaymentMethod isEnabled={isPaymentEnabled} />

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>상품금액</span>
            <span>{subtotal.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>상품할인금액</span>
            <span>{discount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>배송비</span>
            <span className="text-green-600">
              +{shippingFee.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between font-medium">
            <span>결제예정금액</span>
            <span>{total.toLocaleString()}원</span>
          </div>
        </div>

        <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
          {total.toLocaleString()}원 결제하기
        </Button>
      </div>
    </div>
  );
}
