"use client";
import { Header } from "@/components/layout/header";
import { PageLayout } from "@/components/layout/pagelayout";
import { FindIdForm } from "@/feature/find-id/find-id-form";

export default function FindIdPage() {
  return (
    <PageLayout>
      <Header title="아이디 찾기" showDivider={false} />
      <FindIdForm />
    </PageLayout>
  );
}
