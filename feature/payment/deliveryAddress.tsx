"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DeliveryAddress } from "./types/orders";

interface DeliveryAddressProps {
  savedAddress?: DeliveryAddress;
  onSave: (address: DeliveryAddress) => void;
}

export function DeliveryAddressSection({
  savedAddress,
  onSave,
}: DeliveryAddressProps) {
  const [isEditing, setIsEditing] = useState(!savedAddress);
  const [address, setAddress] = useState(savedAddress?.address || "");
  const [detailAddress, setDetailAddress] = useState(
    savedAddress?.detailAddress || "",
  );

  if (!isEditing && savedAddress) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">배송지</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            변경
          </Button>
        </div>
        <div className="text-sm">
          <p>{savedAddress.address}</p>
          <p>{savedAddress.detailAddress}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium">배송지</h3>
      <div className="space-y-2">
        <Input
          placeholder="주소를 입력해주세요"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          placeholder="상세주소를 입력해주세요"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
        <Button
          className="w-full"
          onClick={() => {
            onSave({ address, detailAddress });
            setIsEditing(false);
          }}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
