"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { getLikedProducts } from "@/feature/liked/api/liked-api";

interface ProductResponseDto {
  id: number;
  name: string;
  price: number;
  discount?: number;
  imageUrl: string[];
}

export function LikedProductsPage() {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AuthContext 통해 username 가져오기 (로그인한 사용자)
  const { userInfo, isLoggedIn } = useAuth();
  const username = userInfo?.username || "undefined";

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        // 실제 사용자 이름 사용
        const data = await getLikedProducts(username);
        setProducts(data);
      } catch (err: any) {
        console.error("찜 목록 불러오기 오류:", err);
        setError("찜 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    // 로그인 안된 경우 처리
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // username이 유효할 때만 API 호출
    if (username) {
      fetchData();
    }
  }, [username, isLoggedIn, router]);

  if (isLoading) {
    return <div className="p-4">로딩 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 text-sm text-gray-600">전체 {products.length}개</div>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex gap-4">
            <Image
              src={product.imageUrl?.[0] || "/img/mooni.png"}
              alt={product.name}
              width={100}
              height={100}
              className="rounded-md"
            />
            <div className="flex flex-1 flex-col justify-between py-1">
              <div>
                <div className="line-clamp-2 text-sm">{product.name}</div>
                <div className="mt-1 flex items-center gap-1">
                  <span className="font-medium">
                    {product.price.toLocaleString()}원
                  </span>
                  {/* 할인율 관련 로직은 추후 구현 예정 */}
                </div>
              </div>
              <Button variant="outline" size="sm" className="self-end">
                담기
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
