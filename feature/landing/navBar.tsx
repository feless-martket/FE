"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import RecommendedSection from "./section/recommendedSection";
import NewSection from "./section/newSection";
import BestSection from "./section/bestSection";
import BudgetSection from "./section/bestSection";
import SpecialSection from "./section/bestSection";

const tabs = [
  { id: "recommended", label: "추천", component: RecommendedSection },
  { id: "new", label: "신상품", component: NewSection },
  { id: "best", label: "베스트", component: BestSection },
  { id: "budget", label: "알뜰쇼핑", component: BudgetSection },
  { id: "special", label: "특가/혜택", component: SpecialSection },
];

export default function NavigationTabs() {
  const [activeTab, setActiveTab] = useState("recommended");

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || RecommendedSection;

  return (
    <div>
      <nav className="top-[90px] z-10 h-[38px] w-[360px] bg-background">
        <div className="flex h-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 text-sm relative",
                activeTab === tab.id
                  ? "font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-[#0DBD88]"
                  : "font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500",
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="bg-primary absolute bottom-0 left-0 h-[2px] w-full" />
              )}
            </button>
          ))}
        </div>
      </nav>
      <div className="">
        <ActiveComponent />
      </div>
    </div>
  );
}
