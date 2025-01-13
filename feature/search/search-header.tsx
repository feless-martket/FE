import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface SearchHeaderProps {
  className?: string;
}

export function SearchHeader({ className = "" }: SearchHeaderProps) {
  return (
    <header className={`bg-emerald-500 text-white ${className}`}>
      <div className="relative py-3">
        <h1 className="text-center text-lg font-medium">검색</h1>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 p-1">
          <Link href="/cart">
            <ShoppingCart size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
}
