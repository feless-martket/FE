"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { cancelLike, getLikedProducts } from "@/feature/liked/api/liked-api";
import Link from "next/link";
import { ShoppingCart, Heart, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import myApi from "@/lib/axios";

interface ProductResponseDto {
  id: number;
  name: string;
  price: number;
  discount?: number;
  imageUrls: string[];
}

export function LikedProductsPage() {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [alertMsg, setAlertMsg] = useState<String | null>(null);
  const [alertType, setAlertType] = useState<"default" | "destructive">(
    "default"
  );

  const { userInfo, isLoggedIn } = useAuth();
  const username = userInfo?.username || "undefined";
  const router = useRouter();

  // AlertMsg 3초 뒤 사라짐
  setTimeout(() => {
    setAlertMsg(null);
  }, 3000);

  // 찜 목록 불러오기
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getLikedProducts(username);
        setProducts(data);
      } catch (err: any) {
        console.error("찜 목록 불러오기 오류:", err);
        setError("찜 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    if (username) {
      fetchData();
    }
  }, [username, isLoggedIn, router]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="size-[100px] rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-end">
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // 장바구니 담기 함수
  const handleAddToCart = async (productId: number) => {
    try {
      const response = await myApi.post("cart", {
        cartItemId: productId,
        quantity: 1,
      });
      if (response.status === 200) {
        setAlertType("default");
        setAlertMsg("상품이 장바구니에 추가되었습니다.");
      }
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      setAlertType("destructive");
      setAlertMsg("장바구니 담기에 실패했습니다.");
    }
  };

  // 찜 취소 함수
  const handleDeleteLike = async (productId: number) => {
    if (!username) {
      setAlertType("destructive");
      setAlertMsg("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      router.push("/login");
      return;
    }
    try {
      const response = await cancelLike(username, productId);
      setAlertType("default");
      setAlertMsg(response.message || "찜 취소가 완료되었습니다.");
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("찜 취소 실패:", error);
      setAlertType("destructive");
      setAlertMsg("찜 취소에 실패했습니다.");
    }
  };

  // 찜 목록 비었을 때
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Heart className="mb-4 size-12 text-gray-300" />
        <h2 className="mb-2 text-xl font-semibold">찜한 상품이 없습니다</h2>
        <p className="mb-4 text-gray-500">관심있는 상품을 찜해보세요!</p>
        <Button onClick={() => router.push("/")}>상품 둘러보기</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      {/* Alert가 필요하다면 보여줌 */}
      {alertMsg && (
        <div className="mb-4">
          <Alert variant={alertType}>
            <AlertTitle>
              {alertType === "destructive" ? "오류" : "알림"}
            </AlertTitle>
            <AlertDescription>{alertMsg}</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">찜한 상품 목록</h1>
        <div className="text-sm text-gray-600">전체 {products.length}개</div>
      </div>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:border-gray-300 hover:shadow-md"
          >
            {/* 리스트 항목 클릭 시 상세 페이지 이동 */}
            <Link
              href={`/productDetail/${product.id}`}
              className="flex items-center gap-4 p-4"
            >
              {/* 썸네일 이미지 */}
              <div className="relative size-[100px] overflow-hidden rounded-md border border-gray-200 transition-all group-hover:border-gray-300">
                <Image
                  src={product.imageUrls?.[0] || "/img/mooni.png"}
                  alt={product.name}
                  fill
                  className="rounded-md object-cover transition-transform group-hover:scale-105"
                />
              </div>
              {/* 상품 정보 */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="line-clamp-2 text-sm group-hover:text-gray-900">
                    {product.name}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {product.discount && (
                      <span className="font-medium text-red-500">
                        {product.discount}%
                      </span>
                    )}
                    <span className="font-medium">
                      {product.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
                {/* 버튼 영역 */}
                <div className="mt-2 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-500 hover:border-red-600 hover:bg-red-50 hover:text-red-600"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteLike(product.id);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                  {/* 장바구니 담기 버튼 */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-500 hover:border-green-600 hover:bg-green-50 hover:text-green-600"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
                  >
                    <ShoppingCart className="mr-2 size-4" />
                    담기
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
