"use client";

import { useState, useEffect } from "react";
import axios from "axios";

// 장바구니에 담긴 각 상품의 정보
interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  imgURL: string;
}

// 전체 장바구니의 데이터
interface CartData {
  cartId: number;
  cartItems: CartItem[];
  totalPrice: number;
}

/**
cartData: 장바구니 정보를 저장. API 호출로 데이터를 불러와서 저장함
loading: 데이터가 로드되는 동안 true, 완료되면 false.
error: API 호출 중 에러가 발생할 경우 에러 메시지를 저장
shippingFee: 배송비를 고정값으로 설정
 */
export const ShoppingCart = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const shippingFee = 3000;

  useEffect(() => {
    fetchCartData();
  }, []);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsInJvbGUiOiJST0xFX1VTRVIiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MzYyNTQ2NDAsImV4cCI6MTczNjI1NjQ0MH0.yX9tj68Zvma9_BO04TY8M_gaZ3QnWpg8dG8RUuV84gg`, // Swagger로 발급받은 JWT 토큰
    },
  });

  // 데이터 불러오기
  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<CartData>("/cart"); // /cart API에서 장바구니 데이터를 가져옴
      setCartData(response.data); // 성공하면 데이터 저장
      setError(null);
    } catch (err) {
      // 오류 발생시 에러에 메세지 저장
      setError("장바구니 데이터를 불러오는 중 오류가 발생했습니다.");
      console.error("Error fetching cart data:", err);
    } finally {
      // finally: loading 상태를 false로 설정하여 로딩 상태 해제.
      setLoading(false);
    }
  };

  // 수량 업데이트
  const updateQuantity = async (itemId: number, newQuantity: number) => {
    try {
      await axios.post("/cart", {
        // /cart로 cartItemId와 quantity를 전달해 수량을 업데이트
        cartItemId: itemId,
        quantity: newQuantity,
      });
      fetchCartData(); // 업데이트 후 데이터 새로고침
    } catch (err) {
      setError("수량을 업데이트하는 중 오류가 발생했습니다.");
      console.error("Error updating quantity:", err);
    }
  };

  /**
   *
   * loading: 로딩 중에는 Loading... 표시.
   * error: 오류 발생 시 에러 메시지 표시.
   * cartData가 없을 경우 No items in cart 표시.
   */

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!cartData || !cartData.cartItems || cartData.cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  const totalPrice = cartData.totalPrice + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex items-center justify-center relative border-b pb-3">
        <button className="absolute left-0 text-xl text-gray-500">✕</button>
        <h1 className="text-lg font-bold">장바구니</h1>
      </header>

      <div className="mt-4">
        {/* 상품 정보 */}
        <div className="border-b pb-4">
          <div className="flex items-center space-x-2 mb-3">
            <input
              type="checkbox"
              checked
              className="form-checkbox h-5 w-5 text-green-500"
            />
            <p className="text-sm text-gray-600">
              전체 선택 ({cartData.cartItems.length}/{cartData.cartItems.length}
              )
            </p>
            <button className="text-sm text-gray-500">선택삭제</button>
          </div>
          {cartData.cartItems.map((item) => (
            <div key={item.productId} className="flex space-x-4 mb-4">
              <img
                src={item.imgURL}
                alt={item.productName}
                className="w-16 h-16 rounded-md border"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.productName}</p>
                <p className="text-sm text-gray-700 mt-1">
                  {item.price.toLocaleString()}원
                </p>
                <div className="flex items-center mt-2">
                  <button
                    className="w-8 h-8 border rounded text-gray-700"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    -
                  </button>
                  <p className="px-4">{item.quantity}</p>
                  <button
                    className="w-8 h-8 border rounded text-gray-700"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button className="text-gray-400">✕</button>
            </div>
          ))}
        </div>

        {/* 가격 정보 */}
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex justify-between mb-2">
            <p>상품금액</p>
            <p>{cartData.totalPrice.toLocaleString()}원</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>상품할인금액</p>
            <p>0원</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>배송비</p>
            <p>{shippingFee.toLocaleString()}원</p>
          </div>
          <div className="flex justify-between font-bold text-gray-800 mt-2">
            <p>결제예정금액</p>
            <p>{totalPrice.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      {/* 결제 버튼 */}
      <div className="mt-6">
        <button className="w-full py-3 bg-green-500 text-white font-bold text-lg rounded-md">
          {totalPrice.toLocaleString()}원 결제하기
        </button>
      </div>
    </div>
  );
};
