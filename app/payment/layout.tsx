import React from "react";
import { ReactNode } from "react";
import { OrderProvider } from "@/context/OrderContext";

interface PaymentPageProps {
  children: ReactNode; // children의 타입을 명시
}

export default function Page({ children }: PaymentPageProps) {
  return <OrderProvider> {children} </OrderProvider>;
}
