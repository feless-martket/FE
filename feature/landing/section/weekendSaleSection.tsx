"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fetchProductsByDiscountStatus } from "@/feature/productList/fetchProductsByDiscountStatus";

interface Product {
  id: string;
  name: string;
  price: number; // 정가
  imageUrls: string[];
  delivery: string;
  category: string;
}

export default function BudgetSection() {
  // 주말특가 상품만 가져옴
  const discountStatus = "WEEKEND_SPECIAL";

  // 페이지네이션을 위한 상태
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const [totalPages, setTotalPages] = useState(1);

  // 상품 목록, 로딩, 에러 상태
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 주말특가 상품 불러오기
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(currentPage);
        console.log(pageSize);
        const response = await fetchProductsByDiscountStatus(
          discountStatus,
          currentPage,
          pageSize,
        );
        const { content, totalElements } = response;
        setProducts(content);
        setTotalPages(Math.ceil(totalElements / pageSize));
      } catch (error) {
        setError("주말특가 상품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [discountStatus, currentPage]);

  // 페이지 버튼 클릭 시 페이지 변경 함수
  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col">
      {/* 제목 또는 섹션 헤더 */}
      <div className="mb-4 mt-2 flex items-center justify-between px-4">
        <h2 className="text-lg font-bold text-emerald-600">주말특가</h2>
        {/* 필요하다면 정렬/필터 버튼 추가 */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-sm">
            추천순 <ChevronDown className="ml-1 size-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            필터
          </Button>
        </div>
      </div>

      {/* Loading & Error State */}
      {loading && (
        <div className="text-center text-gray-500">상품을 불러오는 중...</div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/productDetail/${product.id}`}
            className="block"
          >
            <div className="relative flex flex-col rounded-none bg-white p-2 shadow-sm">
              <Image
                src={product.imageUrls[0] || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg object-cover"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-2 right-2 z-10 rounded-full bg-gray-200 p-1"
              >
                <ShoppingCart className="size-5 text-gray-600" />
              </Button>
              <p className="mb-1 text-xs text-gray-500">{product.delivery}</p>
              <h3 className="mb-1 line-clamp-1 text-sm font-medium text-gray-800">
                {product.name}
              </h3>
              <div className="mb-1 flex items-center">
                {/* 할인율 예시 35% 고정 */}
                <span className="mr-1 text-base font-bold text-rose-500">
                  35%
                </span>
                <span className="text-base font-bold">
                  {(product.price * 0.65).toLocaleString()}원
                </span>
              </div>
              <p className="text-xs text-gray-400 line-through">
                {product.price.toLocaleString()}원
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          variant="outline"
          size="sm"
        >
          이전
        </Button>
        <span className="text-sm text-gray-600">
          <span className="font-bold text-black">{currentPage + 1}</span> /{" "}
          {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          variant="outline"
          size="sm"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
