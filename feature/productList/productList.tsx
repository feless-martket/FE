"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchProducts } from "@/feature/productList/productList-api";

const TABS = ["전체보기", "친환경", "고구마·감자·당근", "시금치·쌈채소"];

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
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
        const data = await fetchProducts(selectedTab);
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

      {/* Filter Buttons */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          브랜드 <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          가격 <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          혜택 <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          유형 <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <div className="relative aspect-square mb-2">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-2 top-2"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">{product.delivery}</p>
              <h3 className="font-medium">{product.name}</h3>
              <div className="flex items-center gap-1">
                <span className="text-rose-500 font-bold">
                  {product.discount}%
                </span>
                <span className="font-bold">
                  {product.price.toLocaleString()}원
                </span>
              </div>
              <p className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString()}원
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
