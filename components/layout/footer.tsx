import Link from "next/link";
import { Home, Menu, Search, User } from "lucide-react";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer
      className={`fixed inset-x-0 bottom-0 z-50 bg-gray-100 ${className}`}
    >
      <div className=" mx-auto w-full max-w-[360px] bg-white">
        <nav className="flex items-center justify-between px-4 py-2">
          <Link
            href="/landing"
            className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-emerald-500"
          >
            <Home size={24} />
          </Link>

          <Link
            href="/category"
            className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-emerald-500"
          >
            <Menu size={24} />
          </Link>

          <Link
            href="/search"
            className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-emerald-500"
          >
            <Search size={24} />
          </Link>

          <Link
            href="/login"
            className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-emerald-500"
          >
            <User size={24} />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
