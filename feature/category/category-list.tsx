"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Category {
  id: number;
  name: string;
  subCategories?: string[];
}

const categories: Category[] = [
  {
    id: 1,
    name: "채소",
    subCategories: [
      "전체보기",
      "친환경",
      "고구마·감자·당근",
      "시금치·쌈채소·나물",
      "브로콜리·파프리카·양배추",
      "양파·대파·마늘·배추",
      "오이·호박·고추",
    ],
  },
  { id: 2, name: "과일·견과·쌀" },
  { id: 3, name: "수산·해산·건어물" },
  { id: 4, name: "정육·계란" },
  { id: 5, name: "국반찬·메인요리" },
  { id: 6, name: "샐러드·간편식" },
  { id: 7, name: "면·양념·오일" },
  { id: 8, name: "생수·음료·우유·커피" },
  { id: 9, name: "간식·과자·떡" },
  { id: 10, name: "베이커리·치즈·델리" },
  { id: 11, name: "건강식품" },
  { id: 12, name: "와인·위스키" },
];

export function CategoryList() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} className="border-b border-gray-100">
          <button
            onClick={() =>
              setExpandedId(expandedId === category.id ? null : category.id)
            }
            className="flex w-full items-center justify-between p-4 text-gray-800 hover:bg-gray-50"
          >
            {category.name}
            {expandedId === category.id ? (
              <ChevronUp className="size-5 text-gray-400" />
            ) : (
              <ChevronDown className="size-5 text-gray-400" />
            )}
          </button>

          {expandedId === category.id && category.subCategories && (
            <div className="bg-gray-50 px-4 py-2">
              {category.subCategories.map((subCategory, index) => (
                <button
                  key={index}
                  className="w-full px-2 py-3 text-left text-gray-600 hover:text-emerald-500"
                >
                  {subCategory}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
