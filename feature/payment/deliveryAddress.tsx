"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DaumPostcode from "react-daum-postcode";

interface DeliveryAddress {
  address: string;
  detailAddress: string;
}

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

  // 주소 검색창 표시 여부
  const [showPostcode, setShowPostcode] = useState(false);

  // 주소 검색 완료 핸들러
  const handleComplete = (data: any) => {
    // 선택된 주소(도로명) 사용
    setAddress(data.roadAddress);
    // 필요하면 data.zonecode, data.jibunAddress 등도 활용 가능
    setShowPostcode(false);
  };

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
    <div className="relative space-y-2">
      <h3 className="font-medium">배송지</h3>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="주소를 입력해주세요"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Button onClick={() => setShowPostcode(true)}>주소 검색</Button>
        </div>

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
            console.log(address);
            console.log(detailAddress);
          }}
        >
          저장
        </Button>
      </div>

      {showPostcode && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="bg-white p-4 shadow-xl">
            <DaumPostcode
              onComplete={handleComplete}
              autoClose={false}
              style={{ width: 400, height: 470 }}
            />
            <Button
              variant="outline"
              className="mt-2 w-full"
              onClick={() => setShowPostcode(false)}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
