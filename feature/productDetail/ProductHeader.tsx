"use client";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5"; // 뒤로 가기 아이콘
import { IoCart } from "react-icons/io5"; // 장바구니 아이콘

interface ProductHeader {
  productName: string; // imageUrl은 문자열 타입
}

export default function ProductHeader({ productName }: ProductHeader) {
  return (
    <header className="p-4 border-b">
      <div className="flex items-center justify-between">
        <Link href="/search" className="text-gray-500 text-lg font-semibold">
          <IoArrowBack className="text-lg" />
        </Link>

        <h1 className="text-center text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-[16rem]">
          {productName}
        </h1>

        <div className="flex items-center ml-4">
          <IoCart className="text-lg text-gray-500 hover:text-green-500" />
        </div>
      </div>
    </header>
  );
}
