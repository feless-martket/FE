"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

import { FilterTabs } from "@/feature/search/FilterTabs";
import { FilterCategory, Product } from "@/feature/search/filter";
import {
  fetchFilteredProducts,
  FilterParams,
} from "@/feature/search/search-api";
import { filterMapping } from "@/feature/search/filter-mapping";

// 필터 옵션 상수
const FILTER_OPTIONS: FilterCategory = {
  카테고리: [],
  가격: ["1만원 이하", "1-3만원", "3-5만원", "5만원 이상"],
  할인율: ["20% 이하", "20-50%", "50-80%", "80% 이상"],
  배송: ["새벽배송", "일반배송", "판매자직접배송"],
};

interface ProductFilterProps {
  // 키워드 검색 후 부모에서 받은 상품 결과
  results: Product[];
  totalItems: number;
  // "필터 적용" 클릭 시 -> 키워드 + 필터 -> /search/results/filter
  onFilterChange?: (params: FilterParams) => void;
}

/**
 * 키워드로 검색된 결과(props.results)를 기본으로 보여주고,
 * 필터Tabs에서 "적용" 버튼 클릭 시 -> 다중 필터 API 호출
 */
export function ProductFilter({ results, onFilterChange }: ProductFilterProps) {
  // 현재 화면에 표시할 상품들 (검색 결과)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(results);

  // 여러 배열 상태: mainCategories, subCategories, deliveries
  const [selectedMainCategories, setSelectedMainCategories] = useState<
    string[]
  >([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [selectedDeliveries, setSelectedDeliveries] = useState<string[]>([]);

  // const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  // const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

  useEffect(() => {
    // 검색 결과(results)가 바뀌면 화면도 바뀜
    setFilteredProducts(results);
  }, [results]);

  // 체크박스 선택 변경 시 즉시 필터 적용하여 개수 업데이트
  useEffect(() => {
    const applyFiltersOnChange = async () => {
      const params: FilterParams = {
        mainCategory: selectedMainCategories.map(
          (cat) => filterMapping[cat]?.value.toString() ?? cat
        ),
        subCategory: selectedSubCategories.map(
          (sub) => filterMapping[sub]?.value.toString() ?? sub
        ),
        delivery: selectedDeliveries.map(
          (del) => filterMapping[del]?.value.toString() ?? del
        ),
        // 가격 및 할인율 필터 추가 가능
      };

      try {
        const serverData = await fetchFilteredProducts(params);
        setFilteredProducts(serverData);
        onFilterChange?.(params);
      } catch (err) {
        console.error("필터 검색 오류:", err);
      }
    };

    applyFiltersOnChange();
    // 필터 관련 상태 변화 감지
  }, [selectedMainCategories, selectedSubCategories, selectedDeliveries]);

  /**
   * 버튼 클릭 시
   */
  const handleApplyFilters = async () => {
    console.log("필터 적용합니다.");

    // 최종 FilterParams
    const params: FilterParams = {
      mainCategory: selectedMainCategories.map(
        (cat) => filterMapping[cat]?.value.toString() ?? cat
      ),
      subCategory: selectedSubCategories.map(
        (sub) => filterMapping[sub]?.value.toString() ?? sub
      ),
      delivery: selectedDeliveries.map(
        (del) => filterMapping[del]?.value.toString() ?? del
      ),
      // priceRanges: selectedPrices, // 가격 필터
      // discountRanges: selectedDiscounts, // 할인율 필터
    };

    try {
      const serverData = await fetchFilteredProducts(params);
      setFilteredProducts(serverData);
      onFilterChange?.(params);
    } catch (err) {
      console.error("필터 검색 오류:", err);
    }
  };

  /**
   * 초기화 버튼 클릭 시
   */
  const handleResetFilters = async () => {
    // 모든 필터 상태 초기화
    setSelectedMainCategories([]);
    setSelectedSubCategories([]);
    setSelectedDeliveries([]);
    // setSelectedPrices([]);
    // setSelectedDiscounts([]);

    // 초기화된 필터로 상품 재조회
    const params: FilterParams = {
      // keyword가 필요하다면 여기에 추가
      // keyword: '현재 검색어', // 필요 시 추가
    };

    try {
      const serverData = await fetchFilteredProducts(params);
      setFilteredProducts(serverData);
      onFilterChange?.(params);
    } catch (err) {
      console.error("필터 초기화 검색 오류:", err);
    }
  };

  const deliveryMapping: { [key: string]: string } = {
    GENERAL_DELIVERY: "일반배송",
    EARLY_DELIVERY: "새벽배송",
    SELLER_DELIVERY: "판매자직접배송",
  };

  return (
    <div className="flex flex-col">
      {/* 상단 영역 */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="text-sm text-muted-foreground">
          총 {filteredProducts.length}개
        </div>
        <Button variant="ghost" size="sm" className="text-sm font-normal">
          추천순 <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* 필터 탭 */}
      <FilterTabs
        filterOptions={FILTER_OPTIONS}
        selectedMainCategories={selectedMainCategories}
        setSelectedMainCategories={setSelectedMainCategories}
        selectedSubCategories={selectedSubCategories}
        setSelectedSubCategories={setSelectedSubCategories}
        selectedDeliveries={selectedDeliveries}
        setSelectedDeliveries={setSelectedDeliveries}
        // selectedPrices={selectedPrices}
        // setSelectedPrices={setSelectedPrices}
        // selectedDiscounts={selectedDiscounts}
        // setSelectedDiscounts={setSelectedDiscounts}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        totalFilteredCount={filteredProducts.length} // 추가: 필터링된 상품 개수 전달s
      />

      {/* 상품 리스트 */}
      <div className="flex-1">
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-2 gap-4 p-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/productDetail/${product.id}`}>
                <div className="relative flex flex-col rounded-none bg-white p-2 shadow-sm">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
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
                  <p className="mb-1 text-xs text-gray-500">
                    {deliveryMapping[product.delivery] || product.delivery}
                  </p>
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
        </ScrollArea>
      </div>
    </div>
  );
}
