"use client";

import { useEffect, useRef, useState } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
import Router from "next/router";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = uuidv4();

export function CheckoutPage({ totalAmount }) {
  const [widgets, setWidgets] = useState(null);
  const [ready, setReady] = useState(false);

  // 렌더링(ref) 체크: 'renderPaymentMethods'가 이미 실행되었는지 확인
  const hasRenderedRef = useRef(false);

  const [orderId] = useState(() => nanoid(10));

  useEffect(() => {
    // 1) 위젯 초기화
    async function initWidget() {
      const tossPayments = await loadTossPayments(clientKey);
      const w = tossPayments.widgets({ customerKey });
      setWidgets(w);
    }
    initWidget();
  }, []);

  // 최초 한 번만 renderPaymentMethods
  useEffect(() => {
    if (!widgets) return;

    async function renderOrUpdateWidgets() {
      if (!hasRenderedRef.current) {
        // **최초**: 위젯 렌더
        await widgets.setAmount({ currency: "KRW", value: totalAmount });
        await Promise.all([
          widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          }),
          widgets.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
          }),
        ]);
        setReady(true);
        hasRenderedRef.current = true;
      } else {
        await widgets.setAmount({ currency: "KRW", value: totalAmount });
      }
    }

    renderOrUpdateWidgets();
  }, [widgets, totalAmount]);

  // 결제하기
  const handlePayment = async () => {
    if (!widgets) return;

    try {
      await widgets.requestPayment({
        orderId,
        orderName: "테스트 상품",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div id="payment-method" style={{ marginBottom: "1rem" }} />
      <div id="agreement" style={{ marginBottom: "1rem" }} />
      <button
        onClick={handlePayment}
        disabled={!ready}
        style={{
          width: "100%",
          padding: "0.75rem",
          border: "none",

          backgroundColor: ready ? "#0064FF" : "#ccc",
          color: "#fff",
          fontSize: "1rem",
          cursor: ready ? "pointer" : "not-allowed",
        }}
      >
        {ready ? `${totalAmount.toLocaleString()}원 결제하기` : "준비중..."}
      </button>
      <div className="h-10"></div>
    </div>
  );
}
