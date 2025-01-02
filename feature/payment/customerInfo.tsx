"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CustomerInfo } from "./types/orders";

interface CustomerInfoProps {
  info: CustomerInfo;
}

export function CustomerInfoSection({ info }: CustomerInfoProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
        주문자 정보
        {isOpen ? (
          <ChevronUp className="size-4" />
        ) : (
          <span className="flex items-center">
            <span className="text-muted-foreground mr-2 text-sm font-normal">
              {info.name} / {info.phone}
            </span>
            <ChevronDown className="size-4" />
          </span>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="flex items-center justify-between py-1 text-sm">
          <span>이름</span>
          <span>{info.name}</span>
        </div>
        <div className="flex items-center justify-between py-1 text-sm">
          <span>연락처</span>
          <span>{info.phone}</span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
