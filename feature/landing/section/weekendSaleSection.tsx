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
  price: number;
  imageUrls: string[];
  delivery: string;
  category: string;
}

type SortOption = "POPULAR" | "PRICE" | "DISCOUNT";

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

  // 정렬 메뉴(드롭다운) 관련 상태
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  // 현재 어떤 정렬 옵션인지 관리
  const [sortOption, setSortOption] = useState<SortOption>("POPULAR");

  // 정렬 옵션을 한글 라벨로 표시하기 위한 매핑
  const sortLabels: Record<SortOption, string> = {
    POPULAR: "인기순",
    PRICE: "가격순",
    DISCOUNT: "할인율순",
  };

  // 주말특가 상품 불러오기
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchProductsByDiscountStatus(
          discountStatus,
          currentPage,
          pageSize,
        );
        const { content, totalElements } = response;
        // API로 가져온 상품 목록을 로컬 state에 저장
        let newProducts: Product[] = content;

        switch (sortOption) {
          case "PRICE":
            // 오름차순 가격순
            newProducts = [...newProducts].sort((a, b) => a.price - b.price);
            break;
          case "DISCOUNT":
            // 할인율순 (예: 정가 - 할인후가를 계산해 비교)
            // 현재는 "35% 고정 할인"이라는 가정으로, 정가 대비 할인액이 큰 순으로 정렬
            newProducts = [...newProducts].sort((a, b) => {
              const discountA = a.price - a.price * 0.65;
              const discountB = b.price - b.price * 0.65;
              return discountB - discountA; // 큰 할인액 순
            });
            break;
          case "POPULAR":
          default:
            break;
        }

        setProducts(newProducts);
        setTotalPages(Math.ceil(totalElements / pageSize));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("주말특가 상품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    // sortOption 변경 시에도 재호출
  }, [discountStatus, currentPage, sortOption]);

  // 페이지 버튼 클릭 시 페이지 변경 함수
  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  // 정렬 옵션이 바뀔 때 핸들러
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setSortMenuOpen(false); // 메뉴 닫기
    setCurrentPage(0); // 정렬이 바뀌었으니 페이지를 0으로 초기화하는 것도 고려
  };

  return (
    <div className="flex flex-col">
      {/* 섹션 헤더 */}
      <div className="mb-4 mt-2 flex items-center justify-between px-4">
        <h2 className="text-lg font-bold text-emerald-600">주말특가</h2>

        {/* 정렬/필터 버튼 그룹 */}
        <div className="relative flex gap-2">
          {/* 정렬 드롭다운 */}
          <div className="relative inline-block text-left">
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              onClick={() => setSortMenuOpen(!sortMenuOpen)}
            >
              {sortLabels[sortOption]} <ChevronDown className="ml-1 size-4" />
            </Button>
            {sortMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-36 rounded-md bg-white shadow-md">
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => handleSortChange("POPULAR")}
                >
                  인기순
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => handleSortChange("PRICE")}
                >
                  가격순
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => handleSortChange("DISCOUNT")}
                >
                  할인율순
                </button>
              </div>
            )}
          </div>

          {/* 추가 필터 버튼 예시 */}
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
