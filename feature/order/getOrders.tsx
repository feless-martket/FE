"use server";

export type Order = {
  id: string;
  orderDate: string;
  productName: string;
  orderNumber: string;
  paymentMethod: string;
  amount: number;
  status: string;
};

export async function getOrders(
  period: "3개월" | "6개월" | "1년" | "3년",
): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate empty state for 3개월
  if (period === "3개월") {
    return [];
  }

  // Return mock data for other periods
  return [
    {
      id: "1",
      orderDate: "2023.06.11 (01시 05분)",
      productName: "[롤렉스] 제주 슈퍼드 모짜렐라 치즈 (100g X 3...",
      orderNumber: "2288291924",
      paymentMethod: "신용카드",
      amount: 53365,
      status: "배송완료",
    },
    {
      id: "2",
      orderDate: "2023.06.11 (01시 05분)",
      productName: "[롤렉스] 제주 슈퍼드 모짜렐라 치즈 (100g X 3...",
      orderNumber: "2288291924",
      paymentMethod: "신용카드",
      amount: 53365,
      status: "배송완료",
    },
  ];
}
