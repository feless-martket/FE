"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageLayout } from "@/components/layout/pagelayout";
import { LikedProductsPage } from "@/feature/liked/liked-products";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
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
            className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center"
          >
            <ChevronLeft className="h-6 w-6" />
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
