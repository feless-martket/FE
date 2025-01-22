"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// 1) 타입 정의
interface DeliveryAddress {
  zipCode?: string;
  address: string;
  detailAddress: string;
  deliveryNote?: string;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  phone: string;
}

interface OrderData {
  customerInfo: CustomerInfo;
  deliveryAddress: DeliveryAddress;
  items: OrderItem[];
  usedPoints: number;
  totalPrice: number;
}

// 2) 초기값
const defaultOrderData: OrderData = {
  customerInfo: { name: "", phone: "" },
  deliveryAddress: {
    zipCode: "",
    address: "",
    detailAddress: "",
    deliveryNote: "",
  },
  items: [],
  usedPoints: 0,
  totalPrice: 0,
};

// 3) Context Value 타입
interface OrderContextValue {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  // 혹은 부분 업데이트 함수 등
}

// 4) createContext
const OrderContext = createContext<OrderContextValue | undefined>(undefined);

// 5) Provider
export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderData, setOrderData] = useState<OrderData>(defaultOrderData);

  return (
    <OrderContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
}

// 6) Custom Hook
export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
}
