"use client";
import { Header } from "@/components/layout/header";
import { PageLayout } from "@/components/layout/pagelayout";
import { ResetPasswordForm } from "@/feature/reset-password/reset-password-form";

export default function FindIdPage() {
  return (
    <PageLayout>
      <Header title="비밀번호 재설정" showDivider={false} />
      <ResetPasswordForm />
    </PageLayout>
  );
}
