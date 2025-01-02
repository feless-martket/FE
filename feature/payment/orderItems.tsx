"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { OrderItem } from "./types/orders";

const SAMPLE_ITEMS: OrderItem[] = [
  { id: 1, name: "aaa", price: 6900, quantity: 1 },
  { id: 2, name: "bbb", price: 12000, quantity: 1 },
  { id: 3, name: "ccc", price: 25000, quantity: 1 },
];

export function OrderItems() {
  const [isOpen, setIsOpen] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const displayItems = showMore ? SAMPLE_ITEMS : [SAMPLE_ITEMS[0]];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
        주문상품
        {isOpen ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        {displayItems.map((item) => (
          <div key={item.id} className="flex justify-between py-2 text-sm">
            <span>{item.name}</span>
            <span>{item.price.toLocaleString()}원</span>
          </div>
        ))}
        {!showMore && SAMPLE_ITEMS.length > 1 && (
          <Button
            variant="ghost"
            className="text-muted-foreground w-full text-sm"
            onClick={() => setShowMore(true)}
          >
            더보기 ({SAMPLE_ITEMS.length - 1}개)
          </Button>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
