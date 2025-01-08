"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Minus, Plus, X } from "lucide-react";

interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  imgURL: string;
  isSelected?: boolean;
}

interface CartData {
  cartId: number;
  cartItems: CartItem[];
  totalPrice: number;
}

export const ShoppingCart = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const shippingFee = 3000;

  useEffect(() => {
    fetchCartData();
  }, []);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsInJvbGUiOiJST0xFX1VTRVIiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MzYzMjE0MTQsImV4cCI6MTczNjMyMzIxNH0.qT4ol4To3D4AFexwwS8ZIuoLXQveeZZRDmNjKxLpL1w`,
    },
  });

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<CartData>("/cart");
      setCartData(response.data);
      // Initially select all items
      setSelectedItems(response.data.cartItems.map((item) => item.cartItemId));
      setError(null);
    } catch (err) {
      setError("장바구니 데이터를 불러오는 중 오류가 발생했습니다.");
      console.error("❌ Error fetching cart data:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (cartItemId: number, newQuantity: number) => {
    setCartData((prev) => {
      if (!prev) return prev;

      const updatedCartItems = prev.cartItems.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(newQuantity, 1) }
          : item
      );

      const updatedTotalPrice = calculateTotalPrice(updatedCartItems);

      return {
        ...prev,
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
      };
    });

    debounceSaveCart(cartItemId, newQuantity);
  };

  let saveTimeout: NodeJS.Timeout;
  const debounceSaveCart = (cartItemId: number, quantity: number) => {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      saveCartItemToServer(cartItemId, quantity);
    }, 1000);
  };

  const saveCartItemToServer = async (cartItemId: number, quantity: number) => {
    try {
      setIsSaving(true);
      const response = await axiosInstance.post("/cart/update", null, {
        params: {
          cartItemId: cartItemId,
          quantity: quantity,
        },
      });
      console.log("✅ 수량 업데이트 성공:", response.data);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("잘못된 요청입니다. 수량은 1 이상이어야 합니다.");
      } else {
        setError("수량 업데이트 중 오류가 발생했습니다.");
      }
      console.error("❌ Error saving cart item:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCheckout = async () => {
    if (!cartData) return;
    const selectedItemsTotal = calculateSelectedItemsTotal();
    await saveCartItemToServer(cartData.cartId, selectedItemsTotal);
    alert("결제 페이지로 이동합니다!");
  };

  const toggleItemSelection = (cartItemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  const toggleSelectAll = () => {
    if (!cartData) return;

    if (selectedItems.length === cartData.cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartData.cartItems.map((item) => item.cartItemId));
    }
  };

  const deleteSelectedItems = async () => {
    try {
      await Promise.all(
        selectedItems.map((cartItemId) =>
          axiosInstance.delete(`/cart/item/${cartItemId}`)
        )
      );
      fetchCartData(); // Refresh cart data after deletion
    } catch (err) {
      setError("선택한 상품 삭제 중 오류가 발생했습니다.");
      console.error("❌ Error deleting items:", err);
    }
  };

  const calculateSelectedItemsTotal = () => {
    if (!cartData) return 0;
    return cartData.cartItems
      .filter((item) => selectedItems.includes(item.cartItemId))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalPrice = (items: CartItem[]) => {
    return items
      .filter((item) => selectedItems.includes(item.cartItemId))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!cartData || !cartData.cartItems || cartData.cartItems.length === 0) {
    return <div>장바구니가 비어있습니다.</div>;
  }

  const selectedTotal = calculateSelectedItemsTotal();
  const finalTotal = selectedTotal + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-center relative border-b p-4">
        <button className="absolute left-4">
          <X className="h-6 w-6 text-gray-500" />
        </button>
        <h1 className="text-lg font-medium">장바구니</h1>
      </header>

      <div className="p-4">
        <div className="border-b pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedItems.length === cartData.cartItems.length}
                onChange={toggleSelectAll}
                className="h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              <span className="text-sm text-gray-600">
                전체 선택 ({selectedItems.length}/{cartData.cartItems.length})
              </span>
            </div>
            <button
              onClick={deleteSelectedItems}
              className="text-sm text-gray-500"
            >
              선택삭제
            </button>
          </div>

          <div className="space-y-4">
            {cartData.cartItems.map((item) => (
              <div key={item.cartItemId} className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.cartItemId)}
                  onChange={() => toggleItemSelection(item.cartItemId)}
                  className="mt-2 h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                />
                <div className="flex-1 flex gap-4">
                  <img
                    src={item.imgURL}
                    alt={item.productName}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.productName}</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {item.price.toLocaleString()}원
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity - 1)
                        }
                        className="rounded-md border p-2"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity + 1)
                        }
                        className="rounded-md border p-2"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">상품금액</span>
            <span>{selectedTotal.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">배송비</span>
            <span>{shippingFee.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-base font-medium pt-2 border-t">
            <span>결제예정금액</span>
            <span>{finalTotal.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handleCheckout}
          className="w-full py-4 bg-green-500 text-white font-medium rounded-md"
        >
          {finalTotal.toLocaleString()}원 결제하기
        </button>
        {isSaving && (
          <p className="text-sm text-gray-500 text-center mt-2">저장 중...</p>
        )}
      </div>
    </div>
  );
};
