import { ShoppingBag } from "lucide-react";

interface MyMarketHeaderProps {
  className?: string;
}

export function MyMarketHeader({ className = " " }: MyMarketHeaderProps) {
  return (
    <div className={`bg-emerald-500 px-4 py-3 text-white ${className}`}>
      <div className="relative">
        <div className="text-center text-lg font-medium">마이마켓</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <ShoppingBag className="size-6" />
        </div>
      </div>
    </div>
  );
}
