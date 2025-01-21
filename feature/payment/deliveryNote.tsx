"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DeliveryNotesProps {
  deliveryNote: string;
  onSave: (note: string) => void;
}

export function DeliveryNotes({ deliveryNote, onSave }: DeliveryNotesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(deliveryNote);
  }, [deliveryNote]);

  if (!isEditing) {
    return (
      <Button
        variant="ghost"
        className="text-muted-foreground w-full justify-between"
        onClick={() => setIsEditing(true)}
      >
        {notes || "배송 요청사항을 입력해주세요"}
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
          onSave(notes);
          setIsEditing(false);
        }}
      >
        저장
      </Button>
    </div>
  );
}
