"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MarketHeader() {
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <header className="relative h-[51px] bg-[#0DBD88]">
      <div className="flex items-center">
        <span className="absolute left-[calc(50%-35px-125px)] top-[10px] h-[31px] w-[70px] text-[22.52px] font-bold text-white">
          Market
        </span>
        <ShoppingCart
          className="absolute right-[calc(50%-35px-125px)] top-[18px]"
          size={20}
          color="white"
          onClick={handleCartClick}
        />
      </div>
    </header>
  );
}
