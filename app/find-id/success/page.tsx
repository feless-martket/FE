"use client";

import { Header } from "@/components/layout/header";
import { PageLayout } from "@/components/layout/pagelayout";
import { FindIdSuccess } from "@/feature/find-id/find-id-success";
import { useSearchParams } from "next/navigation";

export default function FindIdSuccessPage() {
  // 쿼리 파라미터 추출
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "unknown";

  return (
    <PageLayout>
      <Header title="아이디 찾기" showDivider={false} />
      <FindIdSuccess username={username} />
    </PageLayout>
  );
}
