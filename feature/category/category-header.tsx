import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CategoryHeaderProps {
  className?: string;
}

export function CategoryHeader({ className = "" }: CategoryHeaderProps) {
  return (
    <header className={`bg-emerald-500 text-white ${className}`}>
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-medium">카테고리</h1>
        <div className="p-1">
          <Link href="/cart">
            <ShoppingCart size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
}
