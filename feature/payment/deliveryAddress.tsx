"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DaumPostcode from "react-daum-postcode";

interface DeliveryAddress {
  zipCode?: string; // 추가
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

  // 우편번호
  const [zipCode, setZipCode] = useState(savedAddress?.zipCode || "");
  // 도로명/지번 주소
  const [address, setAddress] = useState(savedAddress?.address || "");
  // 상세주소
  const [detailAddress, setDetailAddress] = useState(
    savedAddress?.detailAddress || "",
  );

  // 주소 검색창 표시 여부
  const [showPostcode, setShowPostcode] = useState(false);

  // 주소 검색 완료 핸들러
  const handleComplete = (data: any) => {
    // daum-postcode의 반환값 중, 도로명 주소: data.roadAddress
    // 우편번호: data.zonecode
    setZipCode(data.zonecode);
    setAddress(data.roadAddress);
    setShowPostcode(false);
  };

  // ----- 읽기 전용 모드 -----
  if (!isEditing && savedAddress) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">배송지</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            변경
          </Button>
        </div>
        <div className="space-y-1 text-sm">
          {/* 우편번호 */}
          {savedAddress.zipCode && <p>({savedAddress.zipCode})</p>}
          {/* 도로명/지번 주소 */}
          <p>{savedAddress.address}</p>
          {/* 상세주소 */}
          <p>{savedAddress.detailAddress}</p>
        </div>
      </div>
    );
  }

  // ----- 편집 모드 -----
  return (
    <div className="relative space-y-2">
      <h3 className="font-medium">배송지</h3>
      <div className="space-y-2">
        {/* 우편번호 입력 */}
        <div className="flex gap-2">
          <Input
            placeholder="우편번호"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            style={{ width: "120px" }}
          />
          <Button onClick={() => setShowPostcode(true)}>주소 검색</Button>
        </div>

        {/* 도로명 / 지번 주소 */}
        <Input
          placeholder="주소를 입력해주세요"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* 상세주소 입력 */}
        <Input
          placeholder="상세주소를 입력해주세요"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />

        {/* 저장 버튼 */}
        <Button
          className="w-full"
          onClick={() => {
            onSave({ zipCode, address, detailAddress });
            setIsEditing(false);
            console.log("zipCode:", zipCode);
            console.log("address:", address);
            console.log("detailAddress:", detailAddress);
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
