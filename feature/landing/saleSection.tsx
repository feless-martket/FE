import { Button } from "@/components/ui/button";

export default function MagamSaleSection() {
  return (
    <section className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">마감세일</h2>
        <Button variant="link" className="p-0 text-sm text-green-500">
          전체보기 {">"}
        </Button>
      </div>
    </section>
  );
}
