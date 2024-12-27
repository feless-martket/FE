"use client";

import { useState, useEffect } from "react";
import { SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchResults } from "@/feature/search/search-result";

const ALL_KEYWORDS = [
  "기저귀",
  "아침식사",
  "낮또",
  "식빵",
  "오리고기",
  "곤약밥",
  "핫도그",
  "스낵",
  "설화수",
  "다정옥",
  "삼진어묵",
  "조선호텔김치",
  "오물리",
  "드레싱",
  "짱기",
  "골드키위",
  "잣",
  "아메리카노",
];

const PRODUCTS = [
  {
    id: 1,
    name: "[두리] 점아식 기저귀 갈아대 (그래야 잘봄)",
    category: "기저귀",
  },
  { id: 2, name: "[베베베베] DOG 기저귀 7종 (택1)", category: "기저귀" },
  { id: 3, name: "[네띠] 밴드형 기저귀 1팩 12종 (택1)", category: "기저귀" },
  {
    id: 4,
    name: "[마이포코] 리프리넘 밴드형 기저귀 1박스 4종 (택1)",
    category: "기저귀",
  },
  {
    id: 5,
    name: "[마이포코] Flex 밴드형 기저귀 1박스 4종 (택1)",
    category: "기저귀",
  },
  { id: 6, name: "설화수 윤조에센스", category: "화장품" },
  { id: 7, name: "다정옥 냉면", category: "식품" },
  { id: 8, name: "삼진어묵 모듬어묵", category: "식품" },
  { id: 9, name: "조선호텔김치 포기김치", category: "식품" },
  { id: 10, name: "오물리 된장찌개", category: "식품" },
];

export default function SearchFeature() {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);

  useEffect(() => {
    if (searchValue) {
      const filteredSuggestions = ALL_KEYWORDS.filter((keyword) =>
        keyword.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowResults(false);
  };

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchValue) {
      const results = PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.category.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchValue(keyword);
    const results = PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product.category.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResults(results);
    setShowResults(true);
  };

  const clearSearch = () => {
    setSearchValue("");
    setSuggestions([]);
    setShowResults(false);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-[360px] bg-white">
      <div className="p-4 bg-white">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <SearchIcon className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-10 pr-8 bg-gray-50"
          />
          {searchValue && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 h-full"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </form>
      </div>

      {!showResults && suggestions.length > 0 && (
        <ScrollArea className="flex-grow">
          <div className="p-4 space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                className="cursor-pointer p-2 rounded-md hover:bg-gray-100"
                onClick={() => handleKeywordClick(suggestion)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleKeywordClick(suggestion);
                  }
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {showResults && <SearchResults results={searchResults} />}

      {!showResults && suggestions.length === 0 && (
        <ScrollArea className="flex-grow">
          <div className="p-4">
            <h2 className="font-medium mb-3">추천 검색어</h2>
            <div className="flex flex-wrap gap-2">
              {ALL_KEYWORDS.slice(0, 8).map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="px-3 py-1 rounded-full cursor-pointer bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  onClick={() => handleKeywordClick(keyword)}
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          <div className="p-4">
            <h2 className="font-medium mb-3">급상승 검색어</h2>
            <div className="space-y-4">
              {ALL_KEYWORDS.slice(8, 18).map((keyword, index) => (
                <div
                  key={keyword}
                  role="button"
                  tabIndex={0}
                  className="flex items-center gap-4 cursor-pointer p-2 rounded-md hover:bg-gray-100"
                  onClick={() => handleKeywordClick(keyword)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleKeywordClick(keyword);
                    }
                  }}
                >
                  <span className="text-emerald-500 font-medium">
                    {index + 1}
                  </span>
                  <span>{keyword}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
