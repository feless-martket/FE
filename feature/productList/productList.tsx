"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchProducts } from "@/feature/productList/productList-api";
import ProductImage from "@/feature/productDetail/ProductImage"; // ProductImage 컴포넌트 불러오기
import { useSearchParams } from "next/navigation";

const CATEGORY_MAP: Record<string, string> = {
  전체보기: "VEGETABLE",
  친환경: "GREEN_VEGETABLE",
  "고구마·감자·당근": "ROOT_VEGETABLE",
  "시금치·쌈채소": "LEAF_VEGETABLE",
};

const TABS = ["전체보기", "친환경", "고구마·감자·당근", "시금치·쌈채소"];

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
  const paramCategory = searchParams.get("category");

  const [selectedTab, setSelectedTab] = useState(() => {
    if (paramCategory && TABS.includes(paramCategory)) {
      return paramCategory;
    }
    return "전체보기";
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (paramCategory && TABS.includes(paramCategory)) {
      setSelectedTab(paramCategory);
    }
  }, [paramCategory]);

  // 카테고리 변경 시 상품 목록 불러오기
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const category = CATEGORY_MAP[selectedTab];
        console.log(category);
        const data = await fetchProducts(category);
        setProducts(data);
      } catch (err: any) {
        setError("상품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedTab]);

  return (
    <div className="flex flex-col">
      {/* Navigation Tabs */}
      <div className="scrollbar-hide mb-4 flex overflow-x-auto whitespace-nowrap border-b">
        {TABS.map((tab) => (
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
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="relative flex flex-col rounded-none bg-white p-2 shadow-sm"
            >
              {/* 할인 쿠폰 라벨 */}
              {/* <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                +15% 카드쿠폰
              </div> */}

              {/* 상품 이미지 */}
              <ProductImage imageUrl={product.image || "/img/baseball2.jpg"} />

              {/* 장바구니 버튼 */}
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-2 right-2 z-10 rounded-full bg-gray-200 p-1"
              >
                <ShoppingBag className="size-5 text-gray-600" />
              </Button>

              {/* 상품 배송 타입 */}
              <p className="mb-1 text-xs text-gray-500">샛별배송</p>

              {/* 상품 이름 */}
              <h3 className="mb-1 line-clamp-1 text-sm font-medium text-gray-800">
                {product.name}
              </h3>

              {/* 할인율 및 할인 가격 */}
              <div className="mb-1 flex items-center">
                <span className="mr-1 text-base font-bold text-rose-500">
                  35%
                </span>
                <span className="text-base font-bold">
                  {(product.price * 0.65).toLocaleString()}원
                </span>
              </div>

              {/* 정가 */}
              <p className="text-xs text-gray-400 line-through">
                {product.price.toLocaleString()}원
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
