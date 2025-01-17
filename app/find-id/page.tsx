"use client";
import { Header } from "@/components/layout/header";
import { PageLayout } from "@/components/layout/pagelayout";
import { FindIdForm } from "@/feature/find-id/find-id-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function FindIdPage() {
  return (
    <PageLayout>
      <Header
        title="아이디 찾기"
        showDivider={false}
        closeButton={
          <Link
            href="/login"
            className="absolute left-4 top-1/2 -translate-y-1/2"
          >
            <ChevronLeft className="size-6" />
          </Link>
        }
      />
      <FindIdForm />
    </PageLayout>
  );
}
