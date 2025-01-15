// PageLayout.tsx
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode; // children의 타입을 명시
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] rounded-lg bg-white px-4 py-6">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
