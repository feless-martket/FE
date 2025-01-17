"use client";

import { ShoppingCart } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface ProductListHeaderProps {
  className?: string;
}

export function ProductListHeader({ className = "" }: ProductListHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // URL 파라미터에서 메인 카테고리 값을 가져오고, 없으면 기본값 설정
  const mainParam = searchParams.get("main") || "카테고리";

  const handleBack = () => {
    router.back();
  };

  return (
    <header className={`bg-white text-black ${className}`}>
      <div className="flex items-center justify-between border-b px-4 py-3">
        <button className="p-1">
          <ChevronLeft size={24} onClick={handleBack} />
        </button>
        <h1 className="text-lg font-medium">{mainParam}</h1>
        <button className="p-1">
          <Link href="/cart">
            <ShoppingCart size={24} />
          </Link>
        </button>
      </div>
    </header>
  );
}
