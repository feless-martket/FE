import { Footer } from "@/components/layout/footer";
import { MyMarketContent } from "@/feature/mymarket/mymarket-content";
import { MyMarketHeader } from "@/feature/mymarket/mymarket-header";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white">
        <MyMarketHeader />
        <MyMarketContent />
        <Footer />
      </div>
    </div>
  );
}
