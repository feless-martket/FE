"use client";

import { useState } from "react";
import { ChevronDown, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterCategory, Product } from "@/feature/search/filter";
import Link from "next/link";
import Image from "next/image";

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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Update category counts dynamically
  results.forEach((product) => {
    const category = FILTER_OPTIONS.카테고리.find(
      (c) => c.name === product.category
    );
    if (category) {
      category.count++;
    }
  });

  return (
    //<div className="space-y-2">
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="text-sm text-muted-foreground">총 {totalItems}개</div>
        <Button variant="ghost" size="sm" className="text-sm font-normal">
          추천순 <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="border-b ">
        <div className="overflow-x-auto whitespace-nowrap pb-1">
          <div className="inline-flex gap-2 p-3">
            {Object.keys(FILTER_OPTIONS).map((filter) => (
              <Sheet key={filter}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full text-sm font-normal"
                  >
                    {filter} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="mx-auto h-[60vh] w-full max-w-[360px] p-0 sm:max-w-[360px]"
                >
                  <div className="flex h-full flex-col">
                    <SheetHeader className="border-b px-4 py-3">
                      <SheetTitle className="text-lg font-medium">
                        필터
                      </SheetTitle>
                    </SheetHeader>

                    <Tabs defaultValue="카테고리" className="flex-1">
                      <ScrollArea className="border-b">
                        <TabsList className="h-auto w-full justify-start rounded-none border-0 bg-transparent p-0">
                          {Object.keys(FILTER_OPTIONS).map((tab) => (
                            <TabsTrigger
                              key={tab}
                              value={tab}
                              className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-normal data-[state=active]:border-primary data-[state=active]:bg-transparent"
                            >
                              {tab}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </ScrollArea>

                      <ScrollArea className="flex-1 px-4">
                        <TabsContent value="카테고리" className="m-0 py-4">
                          <div className="space-y-4">
                            {FILTER_OPTIONS.카테고리.map((item) => (
                              <label
                                key={item.name}
                                className="flex cursor-pointer items-center gap-3"
                              >
                                <Checkbox
                                  checked={selectedFilters.includes(item.name)}
                                  onCheckedChange={(checked) => {
                                    const newFilters = checked
                                      ? [...selectedFilters, item.name]
                                      : selectedFilters.filter(
                                          (f) => f !== item.name
                                        );
                                    setSelectedFilters(newFilters);
                                    onFilterChange(newFilters);
                                  }}
                                />
                                <span className="flex-1 text-sm">
                                  {item.name}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {item.count}
                                </span>
                              </label>
                            ))}
                          </div>
                        </TabsContent>
                      </ScrollArea>

                      <div className="border-t p-4">
                        <Button className="w-full" size="lg">
                          {totalItems}개 상품 보기
                        </Button>
                      </div>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-2 gap-4 p-4">
            {results.map((product) => (
              <Link
                key={product.id} // Link 컴포넌트에 key 추가
                href={`/productDetail/${product.id}`}
              >
                <div key={product.id} className="space-y-2">
                  <div className="relative aspect-square">
                    <Image
                      src={product.imageUrls[0] || "/placeholder.svg"}
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
