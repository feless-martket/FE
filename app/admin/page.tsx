import ProductSave from "@/feature/todo/admin/ProductSave";

export default function Page() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white">
        <ProductSave />
      </div>
    </div>
  );
}
