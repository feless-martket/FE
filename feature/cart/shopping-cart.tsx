"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Header } from "@/components/layout/header";
import { useAuth } from "@/hooks/useAuth";

// 삭제 확인 모달 컴포넌트
interface DeleteConfirmModalProps {
  isOpen: boolean; // 모달 열림
  onClose: () => void; // 모달 닫기
  onConfirm: () => void; // 삭제 확인 함수
}

function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 sm:max-w-[320px]">
        <div className="p-6">
          <p className="text-center text-base">삭제하시겠습니까?</p>
        </div>
        <DialogFooter className="flex border-t p-0">
          <button
            onClick={onClose}
            className="flex-1 border-r p-4 text-sm hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 p-4 text-sm text-green-600 hover:bg-gray-50"
          >
            확인
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 장바구니 아이템 타입
interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  imgURL: string;
  isSelected?: boolean;
}

// 장바구니 데이터 타입
interface CartData {
  cartId: number;
  cartItems: CartItem[];
  totalPrice: number;
}

// 장바구니 컴포넌트
export const ShoppingCart = () => {
  const [cartData, setCartData] = useState<CartData | null>(null); // 장바구니 데이터 상테
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태
  const [isSaving, setIsSaving] = useState(false); // 저장 상태
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // 선택된 아이템
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달
  const [itemsToDelete, setItemsToDelete] = useState<number[]>([]);

  const shippingFee = 3000; // 배송비 고정
  const { isLoggedIn, userInfo } = useAuth(); // AuthContext에서 상태 가져오기

  useEffect(() => {
    fetchCartData();
  }, []);

  // 인증 구현 미 완성으로 헤더 직접 넣음
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
  });

  // 요청 인터셉터로 Authorization 헤더 설정
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken"); // AuthContext에서도 가능
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 장바구니 데이터 가져오기
  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<CartData>("/cart");

      if (!response.data.cartItems || response.data.cartItems.length === 0) {
        // 장바구니가 비어있을 경우에도 오류로 처리하지 않고 상태를 초기화
        setCartData({
          cartId: response.data.cartId,
          cartItems: [],
          totalPrice: 0,
        });
      } else {
        setCartData(response.data);
        setSelectedItems(
          response.data.cartItems.map((item) => item.cartItemId)
        );
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching cart data:", err);
      setCartData({
        cartId: 0,
        cartItems: [],
        totalPrice: 0,
      });
      setError(null); // UI를 "장바구니가 비어있습니다"로 유지하기 위해 오류를 초기화
    } finally {
      setLoading(false);
    }
  };

  // UI 렌더링 조건
  if (loading) return <div>Loading...</div>;

  // Error 상태를 제거하고 비어있는 경우에만 아래와 같은 UI를 렌더링
  if (!cartData || cartData.cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="장바구니" />
        <div className="flex h-[50vh] items-center justify-center text-2xl font-bold text-gray-500">
          🛒 장바구니가 비어있습니다.
        </div>
      </div>
    );
  }

  // 수량 업데이트
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

  // 수량 저장 디바운스
  let saveTimeout: NodeJS.Timeout;
  const debounceSaveCart = (cartItemId: number, quantity: number) => {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      saveCartItemToServer(cartItemId, quantity);
    }, 1000);
  };

  // 수량 저장 요청
  const saveCartItemToServer = async (cartItemId: number, quantity: number) => {
    try {
      setIsSaving(true);
      const response = await axiosInstance.post("/cart/update", null, {
        params: {
          cartItemId: cartItemId,
          quantity: quantity,
        },
      });
      console.log("수량 업데이트 성공:", response.data);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("잘못된 요청입니다. 수량은 1 이상이어야 합니다.");
      } else {
        setError("수량 업데이트 중 오류가 발생했습니다.");
      }
      console.error("Error saving cart item:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // 결제 처리
  const handleCheckout = async () => {
    if (!cartData) return;
    const selectedItemsTotal = calculateSelectedItemsTotal();
    await saveCartItemToServer(cartData.cartId, selectedItemsTotal);
    alert("결제 페이지로 이동합니다!");
  };

  // 개별 항목 선택 토글
  const toggleItemSelection = (cartItemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  // 전체 선택 토글
  const toggleSelectAll = () => {
    if (!cartData) return;

    if (selectedItems.length === cartData.cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartData.cartItems.map((item) => item.cartItemId));
    }
  };

  // 삭제 모달
  const handleDeleteClick = (items: number[]) => {
    setItemsToDelete(items);
    setIsDeleteModalOpen(true);
  };

  // 선택 항목 상제
  const deleteSelectedItems = async () => {
    try {
      // 선택된 cartItemId를 기반으로 삭제 요청
      await Promise.all(
        itemsToDelete.map((cartItemId) =>
          axiosInstance.delete(`/cart/item/${cartItemId}`)
        )
      );

      setIsDeleteModalOpen(false); // 모달 닫기
      fetchCartData(); // 데이터 새로고침
    } catch (err: any) {
      setError("선택한 상품 삭제 중 오류가 발생했습니다.");
      console.error("Error deleting items:", err);
    }
  };

  // 선택된 항목 총 금액 계산
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
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 공통 Header 사용 */}
        <Header title="장바구니" />
        <div className="flex h-[50vh] items-center justify-center text-2xl font-bold text-gray-500">
          🛒 장바구니가 비어있습니다.
        </div>
      </div>
    );
  }

  const selectedTotal = calculateSelectedItemsTotal();
  const finalTotal = selectedTotal + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="장바구니" />
      <div className="p-4">
        <div className="min-h-screen bg-gray-50 p-4">
          <header className="relative flex items-center justify-center border-b pb-3">
            <button
              className="absolute left-0 text-xl text-gray-500"
              onClick={goToBack}
            >
              ✕
            </button>
            <h1 className="text-lg font-bold">장바구니</h1>
          </header>

          <div className="mt-4">
            {/* 상품 정보 */}
            <div className="border-b pb-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === cartData.cartItems.length}
                    onChange={toggleSelectAll}
                    className="size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">
                    전체 선택 ({selectedItems.length}/
                    {cartData.cartItems.length})
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteClick(selectedItems)}
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
                      className="mt-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                    />
                    <div className="flex flex-1 gap-4">
                      <img
                        src={item.imgURL}
                        alt={item.productName}
                        className="size-20 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">
                          {item.productName}
                        </h3>
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
                            <Minus className="size-4" />
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="rounded-md border p-2"
                          >
                            <Plus className="size-4" />
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
              <div className="flex justify-between border-t pt-2 text-base font-medium">
                <span>결제예정금액</span>
                <span>{finalTotal.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleCheckout}
              className="w-full rounded-md bg-green-500 py-3 text-lg font-bold text-white"
            >
              {finalTotal.toLocaleString()}원 결제하기
            </button>
          </div>
          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={deleteSelectedItems}
          />
        </div>
      </div>
    </div>
  );
};
