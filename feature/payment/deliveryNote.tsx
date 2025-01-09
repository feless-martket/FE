"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DeliveryNotes() {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState("");

  if (!isEditing) {
    return (
      <Button
        variant="ghost"
        className="text-muted-foreground w-full justify-between"
        onClick={() => setIsEditing(true)}
      >
        {savedNotes || "배송 요청사항을 입력해주세요"}
        <ChevronRight className="size-4" />
      </Button>
    );
  }

  return (
    <div className="space-y-2">
      <Input
        placeholder="배송 요청사항을 입력해주세요"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setSavedNotes(notes);
          setIsEditing(false);
        }}
      >
        저장
      </Button>
    </div>
  );
}
