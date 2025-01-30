"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function MarketHeader() {
  return (
    <div className="left-50 fixed top-0 z-50 h-[51px] w-[360px] bg-[#0DBD88]">
      <div className="flex items-center">
        <span className="absolute left-[calc(50%-35px-125px)] top-[10px] h-[31px] w-[160px] text-[20px] font-bold text-white">
          KurlyKelly
        </span>
        <Link href="/cart">
          <ShoppingCart
            className="absolute right-[calc(50%-35px-125px)] top-[15px]"
            size={24}
            color="white"
          />
        </Link>
      </div>
    </div>
  );
}
