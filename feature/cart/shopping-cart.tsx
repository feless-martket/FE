"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Header } from "@/components/layout/header";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { DeleteConfirmModal } from "@/feature/cart/DeleteConfirmModal";
import { CartItem } from "@/feature/cart/CartItem";
import { Footer } from "@/components/layout/footer";
import myApi from "@/lib/axios";

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
  const { isLoading: authLoading, isLoggedIn } = useContext(AuthContext); // AuthContext에서 로그인 상태 가져오기

  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<number[]>([]);

  // 배송비 3000원 고정
  const shippingFee = 3000;

  // useEffect로 로그인 상태에 따라 장바구니 데이터 가져오기
  useEffect(() => {
    if (isLoggedIn) {
      // isLoggedIn === true → fetchCartData()를 호출하여 장바구니 정보를 서버에서 불러옴.
      fetchCartData();
    } else {
      setLoading(false); // isLoggedIn === false → 로그인이 안 된 경우이므로 별도로 API를 부르지 않고 setLoading(false)로 로딩 완료로 처리.
    }
  }, [isLoggedIn]);

  // 장바구니 데이터 가져오기
  const fetchCartData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await myApi.get<CartData>("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    } catch (err: any) {
      console.error("Error fetching cart data:", err);

      // [변경] 401/403 오류 처리를 분기
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("로그인이 필요합니다.");
        // 필요 시 로그인 페이지로 강제 이동
        // router.push("/login");
        setCartData(null);
      } else {
        // 그 외 에러인 경우
        setError("장바구니 데이터를 불러오는 중 오류가 발생했습니다.");
        setCartData(null);
      }
    } finally {
      setLoading(false);
    }
  };

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
      const token = localStorage.getItem("accessToken");
      const response = await myApi.post("/cart/update", null, {
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
    //const selectedItemsTotal = calculateSelectedItemsTotal();
    //await saveCartItemToServer(cartData.cartId, selectedItemsTotal);
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

  // 선택 항목 삭제
  const deleteSelectedItems = async () => {
    try {
      // 선택된 cartItemId를 기반으로 삭제 요청
      const token = localStorage.getItem("accessToken");
      await Promise.all(
        itemsToDelete.map((cartItemId) =>
          myApi.delete(`/cart/item/${cartItemId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      setIsDeleteModalOpen(false);
      fetchCartData();
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

  if (authLoading || loading) return <div>Loading...</div>;

  // 로그인 인증이 되지 않은 사용자의 경우
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="장바구니" />
        <div className="flex flex-col h-[50vh] items-center justify-center text-center">
          <p className="text-2xl font-bold text-gray-700 mb-4">
            로그인 후 이용해주세요
          </p>
          <Link
            href="/login"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            로그인하기
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  // 로그인 인증이 된 사용자이지만, 장바구니에 담긴 상품이 없는 경우
  if (!cartData || !cartData.cartItems || cartData.cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* 공통 Header 사용 */}
        <Header title="장바구니" />
        <div className="flex h-[50vh] items-center justify-center text-2xl font-bold text-gray-500">
          🛒 장바구니가 비어있습니다.
        </div>
        <Footer />
      </div>
    );
  }

  const selectedTotal = calculateSelectedItemsTotal();
  const finalTotal = selectedTotal + shippingFee;

  return (
    <div className="min-h-screen bg-white">
      <Header title="장바구니" />
      <div className="p-4">
        <div className="max-w-[360px] w-full bg-white">
          <div>
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
                  <CartItem
                    key={item.cartItemId}
                    item={item}
                    isSelected={selectedItems.includes(item.cartItemId)}
                    onSelect={toggleItemSelection}
                    onUpdateQuantity={updateQuantity}
                  />
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
