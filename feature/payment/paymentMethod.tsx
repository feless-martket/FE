"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PaymentMethodProps {
  isEnabled: boolean;
}

export function PaymentMethod({ isEnabled }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>();

  return (
    <div className="space-y-4">
      <h3 className="font-medium">결제 수단</h3>
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={selectedMethod === "credit" ? "default" : "outline"}
          disabled={!isEnabled}
          onClick={() => setSelectedMethod("credit")}
          className={
            selectedMethod === "credit" ? "border-primary border-2" : ""
          }
        >
          신용카드
        </Button>
        <Button
          variant={selectedMethod === "easy" ? "default" : "outline"}
          disabled={!isEnabled}
          onClick={() => setSelectedMethod("easy")}
          className={selectedMethod === "easy" ? "border-primary border-2" : ""}
        >
          간편결제
        </Button>
        <Button
          variant={selectedMethod === "mobile" ? "default" : "outline"}
          disabled={!isEnabled}
          onClick={() => setSelectedMethod("mobile")}
          className={
            selectedMethod === "mobile" ? "border-primary border-2" : ""
          }
        >
          휴대폰
        </Button>
      </div>
    </div>
  );
}
