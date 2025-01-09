"use client";
import React, { useState } from "react";

export default function AddressPage() {
  const [zoneCode, setZoneCode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [jibunAddress, setJibunAddress] = useState("");

  const handleClick = () => {
    // 전역 daum 객체 사용 (layout.tsx에서 스크립트를 불러옴)
    new daum.Postcode({
      oncomplete: (data) => {
        // 데이터 추출
        setZoneCode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setJibunAddress(data.jibunAddress);
      },
    }).open();
  };

  return (
    <div className="bg-red-300" style={{ padding: "1rem" }}>
      <h1>주소 검색</h1>
      <button onClick={handleClick}>주소 검색하기</button>

      <div style={{ marginTop: "1rem" }}>
        <label className="">
          우편번호
          <input className="" type="text" value={zoneCode} readOnly />
        </label>
        <br />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label>
          도로명 주소
          <input type="text" value={roadAddress} readOnly />
        </label>
        <br />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label>
          지번 주소
          <input type="text" value={jibunAddress} readOnly />
        </label>
        <br />
      </div>
    </div>
  );
}
