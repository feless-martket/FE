"use client";

import { useState } from "react";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

// 🟢 새로 분리한 FilterTabs 임포트
import { FilterTabs } from "@/feature/search/FilterTabs"; // 실제 경로에 맞게 조정

import { FilterCategory, Product } from "@/feature/search/filter";

// 필터 옵션 상수
const FILTER_OPTIONS: FilterCategory = {
  카테고리: [
    { name: "기저귀, 물티슈관련", count: 170 },
    { name: "여성, 위생용품", count: 7 },
    { name: "배변, 위생", count: 3 },
    { name: "휴지, 타월", count: 1 },
    { name: "세제, 청소용품", count: 1 },
    { name: "이유, 수유용품", count: 1 },
  ],
  가격: ["1만원 이하", "1-3만원", "3-5만원", "5만원 이상"],
  할인율: ["20% 이하", "20-50%", "50-80%", "80% 이상"],
  배송: ["새벽배송", "일반배송", "판매자직접배송"],
};

interface ProductFilterProps {
  totalItems: number;
  onFilterChange: (filters: string[]) => void;
  results: Product[];
}

export function ProductFilter({
  totalItems,
  onFilterChange,
  results,
}: ProductFilterProps) {
  // 사용자가 선택한 카테고리 필터를 관리
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // (예시) 결과에 따라 카테고리 count를 업데이트 하는 로직
  // 실제로는 백엔드 응답이나, 다른 방식으로 count 값을 갱신할 수도 있음
  results.forEach((product) => {
    const category = FILTER_OPTIONS.카테고리.find(
      (c) => c.name === product.category
    );
    if (category) {
      category.count++;
    }
  });

  const handleFilterChange = (filters: string[]) => {
    console.log("필터가 변경되었습니다:", filters);

    // 예: 로컬 상태에도 업데이트
    setSelectedFilters(filters);

    // 상위에서 받은 onFilterChange(있다면) 호출
    onFilterChange(filters);

    // 필요하다면, 여기서 백엔드 재조회(fetch)나 추가 로직 작성 가능
  };

  return (
    <div className="flex flex-col">
      {/* 상단부: 총 N개 / 정렬 버튼 등 */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="text-sm text-muted-foreground">총 {totalItems}개</div>
        <Button variant="ghost" size="sm" className="text-sm font-normal">
          추천순 <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* 필터 탭 컴포넌트로 분리 */}
      <FilterTabs
        filterOptions={FILTER_OPTIONS}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        onFilterChange={handleFilterChange}
        totalItems={totalItems}
      />

      {/* 실제 상품 리스트 */}
      <div className="flex-1">
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-2 gap-4 p-4">
            {results.map((product) => (
              <Link key={product.id} href={`/productDetail/${product.id}`}>
                <div className="space-y-2">
                  <div className="relative aspect-square">
                    <Image
                      src={product.imgUrl || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-2 right-2 size-8"
                    >
                      <ShoppingCart className="size-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-700"
                      >
                        +10% 쿠폰
                      </Badge>
                    </div>
                    <h3 className="line-clamp-2 text-sm font-medium">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="font-medium text-red-500">35%</span>
                      <span className="font-bold">
                        {product.price.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
