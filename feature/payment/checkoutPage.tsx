"use client";

import { useEffect, useState } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { v4 as uuidv4 } from "uuid";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
// const customerKey = uuidv4();
const customerKey = "aVdpl5piLwdkLcdHXaWab";

export function CheckoutPage() {
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 50000,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  const [orderId] = useState(() => generateRandomString());

  // 1) 결제 위젯 초기화
  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제 위젯 생성 (비회원 결제: { customerKey: ANONYMOUS })
      const w = tossPayments.widgets({ customerKey });
      setWidgets(w);
      // console.log(w);
    }
    fetchPaymentWidgets();
  }, []);

  // 2) 위젯 렌더링 (widgets 객체가 세팅되면 한 번만 실행)
  useEffect(() => {
    if (!widgets) return;

    async function renderPaymentWidgets() {
      // 결제 금액 설정
      await widgets.setAmount(amount);

      // 결제 수단과 이용약관 UI 렌더
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
    }

    renderPaymentWidgets();
    // amount를 의존성에 넣으면 계속 재렌더링 위험 → 첫 렌더 시점만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgets]);

  // 3) 금액 변경 시 위젯에 반영
  useEffect(() => {
    if (!widgets) return;
    widgets.setAmount(amount);
  }, [amount, widgets]);

  // 쿠폰 체크박스 핸들러
  // const handleCouponChange = (event) => {
  //   setAmount((prevAmount) => ({
  //     ...prevAmount,
  //     value: event.target.checked
  //       ? prevAmount.value - 5000
  //       : prevAmount.value + 5000,
  //   }));
  // };

  // 결제하기 버튼 클릭 핸들러
  const handlePayment = async () => {
    if (!widgets) return;

    try {
      await fetch("http://localhost:8080/payments/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount: 50000,
        }),
      });

      await widgets.requestPayment({
        orderId,
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
      });
    } catch (error) {
      console.error(error);
      // 실제로는 사용자에게 에러 표시 등을 처리
    }
  };

  return (
    <div>
      {/* 결제수단 선택 영역 */}
      <div id="payment-method" />

      {/* 이용약관 영역 */}
      <div id="agreement" />

      {/* 쿠폰 적용 체크박스 */}
      {/* <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="coupon-box">
          <input
            id="coupon-box"
            type="checkbox"
            aria-checked="true"
            disabled={!ready}
            onChange={handleCouponChange}
          />
          <span style={{ marginLeft: 4 }}>5,000원 쿠폰 적용</span>
        </label>
      </div> */}

      {/* 결제하기 버튼 */}
      <button
        type="button"
        onClick={handlePayment}
        disabled={!ready}
        style={{
          width: "100%",
          padding: "0.75rem",
          border: "none",
          borderRadius: "4px",
          backgroundColor: ready ? "#0064FF" : "#ccc",
          color: "#fff",
          fontSize: "1rem",
          cursor: ready ? "pointer" : "not-allowed",
        }}
      >
        결제하기
      </button>
    </div>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
