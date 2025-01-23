"use client"

import { ChevronLeft, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getOrders, type Order } from "@/feature/order/getOrders"
import OrderDetail from "@/feature/order/orderDetail"

type Period = "3개월" | "6개월" | "1년" | "3년"

export default function OrderHistory() {
  const [period, setPeriod] = useState<Period>("3개월")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true)
      const data = await getOrders(period)
      setOrders(data)
      setLoading(false)
    }
    fetchOrders()
  }, [period])

  return (
    <div className="bg-gray-100">
    <div className="w-[360px] mx-auto bg-white min-h-screen">
      {/* Header */}
      <header className="h-14 flex items-center px-4 border-b">
        <button className="p-2 -ml-2">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center font-medium mr-7">주문내역</h1>
      </header>

      {/* Period Filter */}
      <div className="flex gap-2 p-4">
        {(["3개월", "6개월", "1년", "3년"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setPeriod(tab)}
            className={`flex-1 py-1.5 rounded-md text-sm border ${
              period === tab ? "border-emerald-500 text-emerald-500" : "border-gray-200 text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {selectedOrderId ? (
        <OrderDetail orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} />
      ) : (
        <div className="px-4">
          {loading ? (
            <div className="flex justify-center py-12">Loading...</div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-gray-500">
              <AlertTriangle className="w-12 h-12 text-gray-300 mb-4" />
              <p className="mb-6">{period}간의 주문내역이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-sm text-gray-600">{order.orderDate}</div>
                    <button onClick={() => setSelectedOrderId(order.id)} className="text-sm text-gray-600">
                      주문 상세 &gt;
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">{order.productName}</div>
                    <div className="text-sm text-gray-600">주문번호: {order.orderNumber}</div>
                    <div className="text-sm text-gray-600">결제방법: {order.paymentMethod}</div>
                    <div className="text-sm text-gray-600">결제금액: {order.amount.toLocaleString()}원</div>
                    <div className="text-sm text-gray-600">주문상태: {order.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  )
}

