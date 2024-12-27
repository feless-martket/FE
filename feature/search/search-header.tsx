import { ShoppingBag } from "lucide-react";
interface SearchHeaderProps {
  className?: string;
}

export function SearchHeader({ className = "" }: SearchHeaderProps) {
  return (
    <header className={`bg-emerald-500 text-white ${className}`}>
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-medium">검색</h1>
        <div className="p-1">
          <ShoppingBag size={24} />
        </div>
      </div>
    </header>
  );
}
