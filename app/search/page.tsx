import { Footer } from "@/components/layout/footer";
import { SearchHeader } from "@/feature/search/search-header";
import SearchFeature from "@/feature/search/search-detail";

export default function Page() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="flex w-[360px] flex-col bg-white">
        <SearchHeader />
        <main className="grow overflow-y-auto">
          <SearchFeature />
        </main>
        <Footer />
      </div>
    </div>
  );
}
