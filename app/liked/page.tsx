"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageLayout } from "@/components/layout/pagelayout";
import { LikedProductsPage } from "@/feature/liked/liked-products";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <PageLayout>
      <Header
        title="찜한 상품"
        closeButton={
          <button
            onClick={() => router.back()}
            className="absolute left-0 top-1 flex size-6 items-center justify-center"
          >
            <ChevronLeft className="size-6" />
          </button>
        }
      />

      <main className="grow overflow-y-auto pb-16">
        <LikedProductsPage />
      </main>
      <Footer />
    </PageLayout>
  );
}
