import { ShoppingBag } from "lucide-react";
import { ChevronLeft } from "lucide-react";

interface ProductListHeaderProps {
  className?: string;
}

export function ProductListHeader({ className = "" }: ProductListHeaderProps) {
  return (
    <header className={`bg-white text-black ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <button className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">채소</h1>
        <button className="p-1">
          <ShoppingBag size={24} />
        </button>
      </div>
    </header>
  );
}
