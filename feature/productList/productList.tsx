"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchProducts } from "@/feature/productList/productList-api";
import ProductImage from "@/feature/productDetail/ProductImage"; // ProductImage 컴포넌트 불러오기

// TABS와 DB 카테고리 매핑
const CATEGORY_MAP: Record<string, string> = {
  전체보기: "ALL",
  친환경: "FASHION",
  "고구마·감자·당근": "pork",
  "시금치·쌈채소": "CUCUMBER",
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
  const [selectedTab, setSelectedTab] = useState("전체보기");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 카테고리 변경 시 상품 목록 불러오기
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const category = CATEGORY_MAP[selectedTab] || "ALL";
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
      <div className="flex border-b mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 whitespace-nowrap ${
              tab === selectedTab
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Promotion Banner */}
      <div className="relative h-[120px] mb-4 bg-gray-100">
        <div className="p-4">
          <h2 className="text-xl font-medium">
            농식품부와 함께하는
            <br />
            20% 쿠폰 할인행사
          </h2>
          <p className="text-sm text-gray-500 mt-1">~6월 14일(수) 24시</p>
        </div>
        <Badge className="absolute right-4 top-4 bg-purple-500">COUPON</Badge>
      </div>

      {/* Loading & Error State */}
      {loading && (
        <div className="text-center text-gray-500">상품을 불러오는 중...</div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Product Count and Filters */}
      <div className="flex justify-between items-center px-4 mb-4">
        <span className="text-sm text-gray-600">총 {products.length}개</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-sm">
            추천순 <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            필터
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {products.map((product) => {
          // 20% 할인 가격 계산
          const discountedPrice = Math.round(product.price * 0.8);

          return (
            <div
              key={product.id}
              className="relative p-2 rounded-none shadow-sm flex flex-col bg-white"
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
                className="absolute right-2 bottom-2 bg-gray-200 p-1 rounded-full z-10"
              >
                <ShoppingBag className="h-5 w-5 text-gray-600" />
              </Button>

              {/* 상품 배송 타입 */}
              <p className="text-xs text-gray-500 mb-1">샛별배송</p>

              {/* 상품 이름 */}
              <h3 className="text-sm font-medium text-gray-800 line-clamp-1 mb-1">
                {product.name}
              </h3>

              {/* 할인율 및 할인 가격 */}
              <div className="flex items-center mb-1">
                <span className="text-rose-500 text-base font-bold mr-1">
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
