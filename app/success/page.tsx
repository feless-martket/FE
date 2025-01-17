"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import myApi from "@/lib/axios";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  // 중복 호출 방지
  const hasConfirmedRef = useRef(false);

  useEffect(() => {
    async function confirmAndComplete() {
      try {
        // 1) 토스 결제 승인 과정
        const requestData = {
          orderId: searchParams.get("orderId"),
          amount: searchParams.get("amount"),
          paymentKey: searchParams.get("paymentKey"),
        };

        const token = localStorage.getItem("accessToken");
        const confirmRes = await myApi.post("/payments/confirm", requestData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const confirmJson = await confirmRes.data;
        if (!confirmRes.status) {
          throw { message: confirmJson.message, code: confirmJson.code };
        }

        // confirmJson에는 결제 승인 결과
        console.log("결제 승인 응답:", confirmJson);

        // 2) 결제 완료 데이터 준비
        const completeBody = {
          tossOrderId: confirmJson.orderId,
          paymentKey: confirmJson.paymentKey,
          balanceAmount: confirmJson.balanceAmount,
          paymentMethod: confirmJson.method,
          totalPrice: 50000,
          shipping: {
            zipCode: "00000",
            address: "서울시 강남구 어딘가",
            detailAddress: "상세 주소",
            deliveryNote: "부재시 문앞에 놓아주세요",
          },
          orderItems: [
            { productId: 1, quantity: 2 },
            { productId: 3, quantity: 1 },
          ],
        };

        console.log("결제 완료(complete) 요청 바디:", completeBody);

        // 3) /payments/complete 호출
        const completeRes = await myApi.post(
          "/payments/complete",
          completeBody,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const completeJson = await completeRes.data;
        if (!completeRes.status) {
          throw {
            message: completeJson.message || "complete error",
            code: completeRes.status,
          };
        }

        console.log("결제 완료 후 저장 응답:", completeJson);

        // state에 저장
        setResponseData(confirmJson);
      } catch (error: any) {
        // 실패 시 fail 페이지로 이동
        console.error("오류:", error);
        router.push(`/fail?code=${error.code}&message=${error.message}`);
      }
    }

    if (hasConfirmedRef.current) return;
    hasConfirmedRef.current = true;

    confirmAndComplete();
  }, [router, searchParams]);

  // UI 렌더
  const amount = searchParams.get("amount") || 0;
  const amountStr = Number(amount).toLocaleString() + "원";
  const orderId = searchParams.get("orderId");

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 font-sans">
      <div className="mx-auto w-full max-w-[360px] bg-white p-4 shadow-lg">
        <div className="rounded-lg border-gray-300 pt-36 text-center">
          <img
            className="mx-auto mb-4 w-20"
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            alt="결제 완료 아이콘"
          />
          <h2 className="mb-4 text-xl font-extrabold text-gray-800">
            결제를 완료했어요!
          </h2>
          <p className="mb-6 font-semibold text-gray-600">
            주문이 정상적으로 처리되었습니다.
          </p>

          <div className="mb-4 rounded-md bg-gray-50 p-4 text-left">
            <div className="flex justify-between">
              <span className="font-bold">결제금액</span>
              <span>{amountStr}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="font-bold">주문번호</span>
              <span className="max-w-[180px] break-all text-right">
                {orderId}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Link href="/landing">
              <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                메인화면
              </button>
            </Link>
            <Link href="/mymarket">
              <button className="rounded bg-blue-50 px-4 py-2 font-bold text-blue-700 hover:bg-blue-100">
                마이페이지
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
