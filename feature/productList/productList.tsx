"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  fetchProducts,
  fetchProductsByMainCategory,
} from "@/feature/productList/productList-api";
import { categories } from "@/feature/category/category-list";
import { categoryMapping } from "@/feature/category/category-mapping";
import { mainCategoryMapping } from "@/feature/category/category-mapping";
interface Product {
  id: string;
  name: string;
  price: number; // 정가
  imageUrl: string[];
  delivery: string;
  category: string;
}

export default function ProductList() {
  const searchParams = useSearchParams();
  const mainParam = searchParams.get("main"); // 메인카테고리 파라미터
  const paramCategory = searchParams.get("category"); // 서브카테고리 파라미터
  const [currentPage, setCurrentPage] = useState(0); // 페이지 상태 추가
  const pageSize = 6; // 페이지당 항목 수
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // mainParam에 따른 서브카테고리 목록
  const currentCategory = categories.find(
    (category) => category.name === mainParam
  );
  const subcategories = currentCategory?.subCategories || [];

  // URL 파라미터가 유효하면 이를 초기 선택된 탭으로 설정, 아니면 기본값 "전체보기" 사용
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    if (paramCategory && subcategories.includes(paramCategory)) {
      return paramCategory;
    }
    return "전체보기";
  });

  // URL 파라미터 변경 시 selectedTab 업데이트
  useEffect(() => {
    if (paramCategory && subcategories.includes(paramCategory)) {
      setSelectedTab(paramCategory);
    }
  }, [paramCategory, subcategories]);

  // 상품 목록 불러오기
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        let totalCount;
        if (selectedTab === "전체보기" && mainParam) {
          const mainCategoryCode = mainCategoryMapping[mainParam] || mainParam;
          const response = await fetchProductsByMainCategory(mainCategoryCode, currentPage, pageSize);
          data = response.content; // 상품 데이터
          totalCount = response.totalElements; // 총 상품 개수
        } else {
          const apiCategory = categoryMapping[selectedTab] || selectedTab;
          const response = await fetchProducts(apiCategory, currentPage, pageSize);
          data = response.content;
          totalCount = response.totalElements;
        }
        setProducts(data);
        setTotalPages(Math.ceil(totalCount / pageSize)); // 전체 페이지 수 계산
      } catch (err: any) {
        setError("상품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [selectedTab, currentPage]);

  // 페이지 버튼 클릭 시 페이지 변경 함수
  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Navigation Tabs */}
      <div className="scrollbar-hide mb-4 flex overflow-x-auto whitespace-nowrap border-b">
        {subcategories.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`whitespace-nowrap px-4 py-2 ${
              tab === selectedTab
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loading & Error State */}
      {loading && (
        <div className="text-center text-gray-500">상품을 불러오는 중...</div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}

  {/* Product Count and Filters */}
      <div className="mb-4 flex items-center justify-between px-4">
        <span className="text-sm text-gray-600">총 {products.length}개</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-sm">
            추천순 <ChevronDown className="ml-1 size-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            필터
          </Button>
        </div>
      </div>

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
                src={product.imageUrl[0] || "/placeholder.svg"}
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
                <ShoppingBag className="size-5 text-gray-600" />
              </Button>
              <p className="mb-1 text-xs text-gray-500">{product.delivery}</p>
              <h3 className="mb-1 line-clamp-1 text-sm font-medium text-gray-800">
                {product.name}
              </h3>
              <div className="mb-1 flex items-center">
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
    {/* Pagination */}
<div className="mt-4 flex justify-center gap-4 items-center">
  <Button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 0}
    variant="outline"
    size="sm"
  >
    이전
  </Button>
  <span className="text-sm text-gray-600">
    <span className="font-bold text-black">{currentPage + 1}</span> / {totalPages}
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
