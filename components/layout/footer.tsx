import Link from "next/link";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`fixed bottom-0 w-full border-t bg-white ${className}`}>
      <div className="mx-auto w-[360px] px-4 py-2">
        <nav className="flex items-center justify-between">
          {/* Home */}
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-emerald-500"
          >
            <img src="/icons/home.png" alt="홈" className="size-6" />
            <span>홈</span>
          </Link>
          {/* Menu */}
          <Link
            href="/menu"
            className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-emerald-500"
          >
            <img src="/icons/menu.png" alt="메뉴" className="size-6" />
          </Link>

          {/* Search */}
          <Link
            href="/search"
            className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-emerald-500"
          >
            <img src="/icons/search.png" alt="검색" className="size-6" />
            <span>검색</span>
          </Link>
          {/* MyPage */}
          <Link
            href="/mypage"
            className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-emerald-500"
          >
            <img src="/icons/user.png" alt="마이페이지" className="size-6" />
            <span>마이페이지</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
