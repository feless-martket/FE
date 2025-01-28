"use client";

import { ChevronLeft, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import myApi from "@/lib/axios";
import { parse, format } from "date-fns";
import OrderDetail from "@/feature/order/orderDetail";

type ProductInfo = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type MemberInfo = {
  name: string;
  phone: string;
  address: string;
  detailAddress: string;
  postalCode: string;
  deliveryNote: string;
};

export type OrderList = {
  products: ProductInfo[];
  memberInfo: MemberInfo;
  tossOrderID: string;
  paymentMethod: string;
  totalPrice: number;
  orderStatus: string;
  orderDate: string;
};

type Period = "3개월" | "6개월" | "1년" | "3년";

export default function OrderHistory() {
  const [period, setPeriod] = useState<Period>("3개월");
  const [orders, setOrders] = useState<OrderList[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState<OrderList | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await myApi.get(`/orders/list?period=${period}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.orderLists as OrderList[];
        console.log("응답 데이터:", data);
        setOrders(data);
      } catch (error) {
        console.error("주문 목록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [period]);

  // 상세 보기 -> 뒤로가기
  const handleBack = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="bg-gray-100">
      <div className="mx-auto min-h-screen w-[360px] bg-white">
        {/* Header */}
        <header className="flex h-14 items-center border-b px-4">
          <button className="-ml-2 p-2" onClick={() => router.back()}>
            <ChevronLeft className="size-5" />
          </button>
          <h1 className="mr-7 flex-1 text-center font-medium">주문내역</h1>
        </header>

        {/* Period Filter */}
        <div className="flex gap-2 p-4">
          {(["3개월", "6개월", "1년", "3년"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setPeriod(tab);
                setSelectedOrder(null);
              }}
              className={`flex-1 rounded-md border py-1.5 text-sm ${
                period === tab
                  ? "border-emerald-500 text-emerald-500"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {selectedOrder ? (
          /** 주문 상세 화면 */
          <OrderDetail order={selectedOrder} onBack={handleBack} />
        ) : (
          /** 주문 목록 화면 */
          <div className="px-4">
            {loading ? (
              <div className="flex justify-center py-12">Loading...</div>
            ) : orders.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-gray-500">
                <AlertTriangle className="mb-4 size-12 text-gray-300" />
                <p className="mb-6">{period}간의 주문내역이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {orders.map((order, index) => {
                  // 날짜 파싱 -> 포맷
                  const parsedDate = parse(
                    order.orderDate,
                    "yyyy-MM-dd'T'HH:mm:ss.SSSSSS",
                    new Date(),
                  );
                  const formattedDate = format(
                    parsedDate,
                    "yyyy.MM.dd (HH시 mm분)",
                  );

                  return (
                    <div
                      key={order.tossOrderID ?? index}
                      className="rounded-lg border p-4"
                    >
                      {/* 주문 상단 정보 */}
                      <div className="mb-1 flex items-start justify-between">
                        <div className="text-sm text-gray-600">
                          {formattedDate}
                        </div>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-xs text-gray-600"
                        >
                          주문 상세 &gt;
                        </button>
                      </div>

                      {/* 상품 리스트 */}
                      <div className="my-2 text-sm font-medium">
                        {order.products.map((prod) => (
                          <div key={prod.id} className="mb-1 border-b-2">
                            {prod.name}
                            <br /> ({prod.price?.toLocaleString()}원 /{" "}
                            {prod.quantity}개)
                          </div>
                        ))}
                      </div>

                      {/* 주문 본문 정보 */}
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          주문번호: {order.tossOrderID}
                        </div>
                        <div className="text-sm text-gray-600">
                          결제방법: {order.paymentMethod}
                        </div>
                        <div className="text-sm text-gray-600">
                          결제금액: {order.totalPrice?.toLocaleString()}원
                        </div>
                        <div className="text-sm text-gray-600">
                          결제상태: {order.orderStatus}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
