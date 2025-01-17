import { CategoryHeader } from "@/feature/category/category-header";
import { CategoryList } from "@/feature/category/category-list";
import { Footer } from "@/components/layout/footer";
export default function CategoryPage() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="flex w-[360px] flex-col bg-white pb-[52px]">
        <CategoryHeader />
        <main className="grow overflow-y-auto">
          <CategoryList />
        </main>
        <Footer />
      </div>
    </div>
  );
}
