"use client";

import { useState, useContext, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderItems } from "@/feature/payment/orderItems";
import { CustomerInfoSection } from "@/feature/payment/customerInfo";
import { DeliveryAddressSection } from "@/feature/payment/deliveryAddress";
import { DeliveryNotes } from "@/feature/payment/deliveryNote";
import { PointsSection } from "@/feature/payment/pointSection";
import { AuthContext } from "@/context/AuthContext";
import { CheckoutPage } from "@/feature/payment/checkoutPage";
import { useRouter } from "next/navigation";
import myApi from "@/lib/axios";

export default function OrderPage() {
  const router = useRouter();

  const authContext = useContext(AuthContext);
  const { isLoading, isLoggedIn, userInfo } = authContext || {};

  const [cartItems, setCartItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState(null);

  const [formData, setFormData] = useState({
    customerInfo: {
      name: "",
      phone: "",
    },
    items: [],
  });

  const [usedPoints, setUsedPoints] = useState(0);

  const goToBack = () => {
    router.back();
  };
  // userInfo -> formData.customerInfo
  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        customerInfo: {
          ...prev.customerInfo,
          name: userInfo.name || "",
          phone: userInfo.phoneNumber || "",
        },
      }));
    }
  }, [userInfo]);

  // 장바구니에서 아이템 가져오기
  useEffect(() => {
    async function fetchCart() {
      try {
        setItemsLoading(true);
        setItemsError(null);
        const token = localStorage.getItem("accessToken");
        const res = await myApi.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setCartItems(data.cartItems || []);
      } catch (err) {
        console.error("장바구니 조회 실패:", err);
        setItemsError("장바구니를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setItemsLoading(false);
      }
    }
    fetchCart();
  }, []);

  // cartItems -> formData.items
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      items: cartItems.map((item) => ({
        id: item.productId,
        name: item.productName,
        price: item.price,
        quantity: item.quantity,
      })),
    }));
  }, [cartItems]);

  if (itemsLoading) return <div>상품 로딩 중...</div>;
  if (itemsError) return <div>{itemsError}</div>;

  // 물건 가격
  const subtotal = formData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingFee = 3000;
  const discount = usedPoints;
  const total = subtotal + shippingFee - discount;

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-[360px] space-y-6 bg-white p-4">
        <div className="flex items-center gap-24 text-center">
          <Button variant="ghost" size="icon" onClick={goToBack}>
            <ChevronLeft className="size-4" />
          </Button>
          <h1 className="text-lg font-bold">주문서</h1>
        </div>

        {/* 장바구니 상품 표시 */}
        <OrderItems items={cartItems} />

        <div className="h-3 !w-[360px] translate-x-[-14px] bg-gray-100" />

        {/* 주문자 정보 */}
        <CustomerInfoSection info={formData.customerInfo} />
        <div className="h-3 !w-[360px] translate-x-[-14px] bg-gray-100" />

        <DeliveryAddressSection
          savedAddress={formData.deliveryAddress}
          onSave={(address) =>
            setFormData((prev) => ({ ...prev, deliveryAddress: address }))
          }
        />
        <div className="h-3 !w-[360px] translate-x-[-14px] bg-gray-100" />

        <DeliveryNotes />
        <div className="h-3 !w-[360px] translate-x-[-14px] bg-gray-100" />

        <PointsSection
          availablePoints={1000}
          onPointsChange={(points) => setUsedPoints(points)}
        />

        {/* 결제금액 표시 */}
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
              + {shippingFee.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between font-medium">
            <span>결제예정금액</span> <span>{total.toLocaleString()}원</span>
          </div>
        </div>

        {/* (5) CheckoutPage에 totalAmount를 props로 넘김 */}
        <CheckoutPage totalAmount={total} />
      </div>
    </div>
  );
}
