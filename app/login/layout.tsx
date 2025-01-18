// PageLayout.tsx
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode; // children의 타입을 명시
}

export default function Page({ children }: PageLayoutProps) {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 tracking-tighter">
      <div className="h-full w-[360px] bg-white">{children}</div>
    </div>
  );
}
