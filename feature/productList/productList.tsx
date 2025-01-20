"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  fetchProducts,
  fetchProductsByMainCategory,
} from "@/feature/productList/productList-api";
import ProductImage from "@/feature/productDetail/ProductImage";
import { categories } from "@/feature/category/category-list";
import { categoryMapping } from "@/feature/category/category-mapping";
import { mainCategoryMapping } from "@/feature/category/category-mapping";
interface Product {
  id: string;
  name: string;
  price: number; // 정가
  image: string;
  delivery: string;
  category: string;
}

export default function ProductList() {
  const searchParams = useSearchParams();
  const mainParam = searchParams.get("main"); // 메인카테고리 파라미터
  const paramCategory = searchParams.get("category"); // 서브카테고리 파라미터

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

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL 파라미터 변경 시 selectedTab 업데이트
  useEffect(() => {
    if (paramCategory && subcategories.includes(paramCategory)) {
      setSelectedTab(paramCategory);
    }
  }, [paramCategory, subcategories]);

  // 선택된 탭이 변경될 때마다 상품 목록 불러오기
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (selectedTab === "전체보기" && mainParam) {
          // "전체보기"일 경우 메인카테고리에 따른 상품 불러오기
          const mainCategoryCode = mainCategoryMapping[mainParam] || mainParam;
          data = await fetchProductsByMainCategory(mainCategoryCode);
        } else {
          // 일반 서브카테고리일 경우 영문 코드 변환 후 상품 불러오기
          const apiCategory = categoryMapping[selectedTab] || selectedTab;
          data = await fetchProducts(apiCategory);
        }
        setProducts(data);
      } catch (err: any) {
        setError("상품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [selectedTab, mainParam]);

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

      {/* Promotion Banner */}
      <div className="relative mb-4 h-[120px] bg-gray-100">
        <div className="p-4">
          <h2 className="text-xl font-medium">
            농식품부와 함께하는
            <br />
            20% 쿠폰 할인행사
          </h2>
          <p className="mt-1 text-sm text-gray-500">~6월 14일(수) 24시</p>
        </div>
        <Badge className="absolute right-4 top-4 bg-purple-500">COUPON</Badge>
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
              <ProductImage imageUrl={product.image || "/img/baseball2.jpg"} />
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
    </div>
  );
}
