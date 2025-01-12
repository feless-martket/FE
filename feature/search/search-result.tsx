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
import { ChevronDown, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Product } from "./search-api";
import Link from "next/link";

const FILTER_OPTIONS = {
  카테고리: [
    { name: "fruit", count: 0 },
    { name: "dailyNecessities", count: 0 },
    { name: "electronicDevices", count: 0 },
    { name: "vegetable", count: 0 },
  ],
  브랜드: [],
  가격: ["1만원 이하", "1-3만원", "3-5만원", "5만원 이상"],
  혜택: ["할인상품", "쿠폰적용", "무료배송", "증정품"],
  "특정상품 제외": ["특가상품", "이벤트상품"],
};

interface SearchResultsProps {
  results: Product[];
}

export function SearchResults({ results }: SearchResultsProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Update category counts
  results.forEach((product) => {
    const category = FILTER_OPTIONS.카테고리.find(
      (c) => c.name === product.category,
    );
    if (category) {
      category.count++;
    }
  });

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-2">
        <div className="text-sm">총 {results.length}개</div>
        <Button variant="ghost" size="sm" className="text-sm font-normal">
          추천순 <ChevronDown className="ml-1 size-4" />
        </Button>
      </div>

      <div className="border-b">
        <ScrollArea className="whitespace-nowrap">
          <div className="flex gap-2 p-2">
            {Object.keys(FILTER_OPTIONS)
              .slice(0, 4)
              .map((filter) => (
                <Sheet key={filter}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-full text-sm font-normal"
                    >
                      {filter} <ChevronDown className="ml-1 size-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="bottom"
                    className="mx-auto h-[50vh] w-full p-0 sm:max-w-[360px]"
                  >
                    <div className="flex h-full flex-col">
                      <SheetHeader className="border-b px-4 py-3">
                        <SheetTitle className="text-lg font-medium">
                          필터
                        </SheetTitle>
                      </SheetHeader>

                      <Tabs defaultValue="카테고리" className="flex-1">
                        <ScrollArea className="border-b">
                          <TabsList className="h-auto border-0 bg-transparent p-0">
                            {Object.keys(FILTER_OPTIONS).map((tab) => (
                              <TabsTrigger
                                key={tab}
                                value={tab}
                                className="rounded-none px-4 py-2 text-sm font-normal data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-500"
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
                                  <Checkbox />
                                  <span className="flex-1 text-sm">
                                    {item.name}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {item.count}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </TabsContent>
                          {/* Other tabs content */}
                        </ScrollArea>

                        <div className="border-t p-4">
                          <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                            {results.length}개 상품 보기
                          </Button>
                        </div>
                      </Tabs>
                    </div>
                  </SheetContent>
                </Sheet>
              ))}
          </div>
          <div className="flex gap-2 px-2 pb-2">
            <Badge
              variant="secondary"
              className="rounded-sm bg-emerald-50 text-emerald-700"
            >
              +10% 쿠폰
            </Badge>
            <Badge
              variant="secondary"
              className="rounded-sm bg-emerald-50 text-emerald-700"
            >
              +15% 카드쿠폰
            </Badge>
          </div>
        </ScrollArea>
      </div>

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
                    src={product.imgurl || "/placeholder.svg"}
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
  );
}
