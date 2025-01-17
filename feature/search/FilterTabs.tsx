"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterCategory } from "@/feature/search/filter";
import { categories } from "@/feature/category/category-list";
import { useState } from "react";

interface FilterTabsProps {
  filterOptions: FilterCategory; // 필터 옵션 전체 객체
  selectedFilters: string[]; // 선택된 필터들
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  onFilterChange: (filters: string[]) => void; // 상위로 변경된 필터값을 전달
  totalItems: number; // 전체 상품 개수
}

export function FilterTabs({
  filterOptions,
  selectedFilters,
  setSelectedFilters,
  onFilterChange,
  totalItems,
}: FilterTabsProps) {
  // (2) 각 TabsTrigger를 열 때, 어떤 탭이 선택되었는지 상태로 추적
  //    (기본값: "카테고리" 탭)
  const [activeTab, setActiveTab] = useState<keyof FilterCategory | "카테고리">(
    "카테고리"
  );

  // 🔴 메인 카테고리의 펼침(Accordion) 상태를 추적
  //    → 카테고리 id를 저장해두고, 그 id인 경우에만 서브카테고리를 렌더링
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // (3) 체크박스 핸들러
  const handleCheck = (checked: boolean | "indeterminate", name: string) => {
    const newFilters = checked
      ? [...selectedFilters, name]
      : selectedFilters.filter((f) => f !== name);
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="border-b">
      <div className="overflow-x-auto whitespace-nowrap pb-1">
        <div className="inline-flex gap-2 p-3">
          {/* Sheet(모달) 트리거: 카테고리 / 가격 / 할인율 / 배송 */}
          {["카테고리", "가격", "할인율", "배송"].map((filterKey) => (
            <Sheet key={filterKey}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-full text-sm font-normal"
                  onClick={() =>
                    setActiveTab(filterKey as keyof FilterCategory)
                  }
                >
                  {filterKey} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="bottom"
                className="mx-auto h-[60vh] w-full max-w-[360px] p-0 sm:max-w-[360px]"
                aria-describedby="filter-description"
              >
                <p id="filter-description" className="sr-only">
                  선택한 필터에 따라 결과를 필터링합니다.
                </p>
                <div className="flex h-full flex-col">
                  <SheetHeader className="border-b px-4 py-3">
                    <SheetTitle className="text-lg font-medium">
                      필터
                    </SheetTitle>
                  </SheetHeader>

                  <Tabs value={activeTab} className="flex-1">
                    <ScrollArea className="border-b">
                      <TabsList className="h-auto w-full justify-start rounded-none border-0 bg-transparent p-0">
                        {["카테고리", "가격", "할인율", "배송"].map((tab) => (
                          <TabsTrigger
                            key={tab}
                            value={tab}
                            className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-normal data-[state=active]:border-primary data-[state=active]:bg-transparent"
                            onClick={() =>
                              setActiveTab(tab as keyof FilterCategory)
                            }
                          >
                            {tab}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </ScrollArea>

                    {/* 1) 카테고리 탭 */}
                    <ScrollArea className="flex-1 px-4">
                      <TabsContent value="카테고리" className="m-0 py-4">
                        <div className="space-y-4">
                          {categories.map((cat) => (
                            <div key={cat.id} className="border-b pb-2">
                              {/* 메인 카테고리 라벨 + 펼침/접힘 아이콘 */}
                              <div className="flex items-center justify-between">
                                <label className="flex cursor-pointer items-center gap-3">
                                  <Checkbox
                                    checked={selectedFilters.includes(cat.name)}
                                    onCheckedChange={(checked) =>
                                      handleCheck(checked, cat.name)
                                    }
                                  />
                                  <span className="flex-1 text-sm">
                                    {cat.name}
                                  </span>
                                </label>
                                {/* 펼침/접힘 토글 버튼 */}
                                {cat.subCategories &&
                                  cat.subCategories.length > 0 && (
                                    <button
                                      onClick={() =>
                                        setExpandedId(
                                          expandedId === cat.id ? null : cat.id
                                        )
                                      }
                                    >
                                      {expandedId === cat.id ? (
                                        <ChevronUp className="h-5 w-5 text-gray-500" />
                                      ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                      )}
                                    </button>
                                  )}
                              </div>

                              {/* 서브카테고리 (접힘/펼침) */}
                              {expandedId === cat.id && cat.subCategories && (
                                <div className="mt-2 ml-6 flex flex-col space-y-1">
                                  {cat.subCategories.map((sub, idx) => (
                                    <label
                                      key={idx}
                                      className="flex cursor-pointer items-center gap-3"
                                    >
                                      <Checkbox
                                        checked={selectedFilters.includes(sub)}
                                        onCheckedChange={(checked) =>
                                          handleCheck(checked, sub)
                                        }
                                      />
                                      <span className="flex-1 text-sm">
                                        {sub}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      {/* 2) 가격 탭 */}
                      <TabsContent value="가격" className="m-0 py-4">
                        <div className="space-y-4">
                          {filterOptions.가격?.map((item) => (
                            <label
                              key={item}
                              className="flex cursor-pointer items-center gap-3"
                            >
                              <Checkbox
                                checked={selectedFilters.includes(item)}
                                onCheckedChange={(checked) =>
                                  handleCheck(checked, item)
                                }
                              />
                              <span className="flex-1 text-sm">{item}</span>
                            </label>
                          ))}
                        </div>
                      </TabsContent>

                      {/* 3) 할인율 탭 */}
                      <TabsContent value="할인율" className="m-0 py-4">
                        <div className="space-y-4">
                          {filterOptions.할인율?.map((item) => (
                            <label
                              key={item}
                              className="flex cursor-pointer items-center gap-3"
                            >
                              <Checkbox
                                checked={selectedFilters.includes(item)}
                                onCheckedChange={(checked) =>
                                  handleCheck(checked, item)
                                }
                              />
                              <span className="flex-1 text-sm">{item}</span>
                            </label>
                          ))}
                        </div>
                      </TabsContent>

                      {/* 4) 배송 탭 */}
                      <TabsContent value="배송" className="m-0 py-4">
                        <div className="space-y-4">
                          {filterOptions.배송?.map((item) => (
                            <label
                              key={item}
                              className="flex cursor-pointer items-center gap-3"
                            >
                              <Checkbox
                                checked={selectedFilters.includes(item)}
                                onCheckedChange={(checked) =>
                                  handleCheck(checked, item)
                                }
                              />
                              <span className="flex-1 text-sm">{item}</span>
                            </label>
                          ))}
                        </div>
                      </TabsContent>
                    </ScrollArea>

                    {/* 하단 적용 버튼 */}
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
  );
}
