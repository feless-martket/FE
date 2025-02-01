// tossPayments.d.ts

import {
  WidgetAgreementWidget,
  WidgetPaymentMethodWidget,
} from "@tosspayments/tosspayments-sdk";

/**
 * TossPayments: loadTossPayments()로 가져오는 최상위 객체의 인터페이스
 */
export interface TossPayments {
  /**
   * 위젯 객체를 생성하는 메서드
   * @param options - PaymentWidgetsOptions
   */
  widgets(options: PaymentWidgetsOptions): PaymentWidgets;
  // 필요하다면 tossPayments.requestPayment(), requestBillingAuth() 등이 있을 수 있음
}

/**
 * widgets(...)에 전달할 옵션
 */
export interface PaymentWidgetsOptions {
  customerKey: string;
  // 추가 옵션이 있다면 여기에 정의 (ex. locale, brandpay 설정 등)
}

/**
 * widgets(...)가 반환하는 PaymentWidgets 인터페이스
 * - setAmount, renderPaymentMethods, renderAgreement, requestPayment 등을 제공합니다.
 */
export interface PaymentWidgets {
  setAmount(params: { currency: string; value: number }): Promise<void>;

  // renderPaymentMethods가 "Promise<WidgetPaymentMethodWidget>"를 반환한다고 가정
  renderPaymentMethods(options: {
    selector: string;
    variantKey?: string;
  }): Promise<WidgetPaymentMethodWidget>;

  // renderAgreement도 마찬가지로, 라이브러리에서 반환하는 타입에 맞게 수정
  renderAgreement(options: {
    selector: string;
    variantKey?: string;
  }): Promise<WidgetAgreementWidget>;

  requestPayment(options: {
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
  }): Promise<void>;

  // 만약 정기 결제 등의 API가 필요하다면
  // requestBillingAuth?(options: BillingAuthOptions): Promise<void>;
  // requestSubscription?(options: SubscriptionOptions): Promise<void>;
}

/**
 * setAmount에 사용하는 파라미터
 */
export interface AmountParams {
  currency: string; // "KRW" | "USD" 등
  value: number; // 결제 금액
}

/**
 * renderPaymentMethods 옵션
 */
export interface PaymentMethodsOptions {
  selector: string;
  variantKey?: string; // "DEFAULT" | "RESPONSIVE" 등 Toss Docs 참고
  // brandpay?: { showSearchButton?: boolean; } 등 추가 가능
}

/**
 * renderAgreement 옵션
 */
export interface AgreementOptions {
  selector: string;
  variantKey?: string;
}

/**
 * requestPayment 옵션
 */
export interface PaymentRequestOptions {
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
  // 필요하다면 추가 필드 (amount, customerEmail 등)
}

/**
 * (선택) 빌링 인증 옵션
 */
// export interface BillingAuthOptions {
//   // ...
// }

// /**
//  * (선택) 정기 결제 옵션
//  */
// export interface SubscriptionOptions {
//   // ...
// }
