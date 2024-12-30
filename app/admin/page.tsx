import ProductSave from "@/feature/admin/ProductSave";
import { Footer } from "@/components/layout/footer";
export default function Page() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white">
        <ProductSave />
        <Footer></Footer>
      </div>
    </div>
  );
}
