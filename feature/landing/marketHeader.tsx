"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function MarketHeader() {
  return (
    <header className="relative h-[51px] bg-[#0DBD88]">
      <div className="flex items-center">
        <span className="absolute left-[calc(50%-35px-125px)] top-[10px] h-[31px] w-[160px] text-[20px] font-bold text-white">
          KurlyKelly
        </span>
        <Link href="/cart">
          <ShoppingCart
            className="absolute right-[calc(50%-35px-125px)] top-[18px]"
            size={24}
            color="white"
          />
        </Link>
      </div>
    </header>
  );
}
