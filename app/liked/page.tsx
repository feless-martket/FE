import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LikedProducts } from "@/feature/liked/liked-products";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100">
      <div className="flex w-[360px] flex-col bg-white">
        <Header
          title="찜한 상품"
          showDivider={false}
          closeButton={
            <Link
              href="/mymarket"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <ChevronLeft className="size-6" />
            </Link>
          }
        />
        <main className="grow overflow-y-auto pb-16">
          <LikedProducts />
        </main>
        <Footer />
      </div>
    </div>
  );
}
