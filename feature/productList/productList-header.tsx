"use client";

import { ShoppingCart } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductListHeaderProps {
  className?: string;
}

export function ProductListHeader({ className = "" }: ProductListHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className={`bg-white text-black ${className}`}>
      <div className="flex items-center justify-between border-b px-4 py-3">
        <button className="p-1">
          <ChevronLeft size={24} onClick={handleBack} />
        </button>
        <h1 className="text-lg font-medium">채소</h1>
        <button className="p-1">
          <Link href="/cart">
            <ShoppingCart size={24} />
          </Link>
        </button>
      </div>
    </header>
  );
}
