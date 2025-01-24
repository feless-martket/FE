import ProductSave from "@/feature/admin/ProductSave";
import { Footer } from "@/components/layout/footer";

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-auto">
        <div className="w-full max-w-[360px] mx-auto bg-white">
          <ProductSave />
        </div>
      </div>
      <div className="w-full max-w-[360px] mx-auto bg-white">
        <Footer />
      </div>
    </div>
  );
}
