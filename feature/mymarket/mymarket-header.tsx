import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface MyMarketHeaderProps {
  className?: string;
}

export function MyMarketHeader({ className = " " }: MyMarketHeaderProps) {
  return (
    <div className={`bg-emerald-500 px-4 py-3 text-white ${className}`}>
      <div className="relative">
        <div className="text-center text-lg font-medium">마이마켓</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Link href="/cart">
            <ShoppingCart className="size-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
