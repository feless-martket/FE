"use client";

import { Footer } from "@/components/layout/footer";
import { MyMarketContent } from "@/feature/mymarket/mymarket-content";
import { MyMarketHeader } from "@/feature/mymarket/mymarket-header";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isLoading, isLoggedIn, userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("라우팅 체크:", { isLoading, isLoggedIn });

    if (isLoading) return;

    if (!isLoading && !isLoggedIn) {
      console.log("로그인되지 않은 사용자 -> /login 리다이렉트");
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!isLoggedIn) {
    return null;
  }
  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white">
        <MyMarketHeader />
        <MyMarketContent userInfo={userInfo} />
        <Footer />
      </div>
    </div>
  );
}
