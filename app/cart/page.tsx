import { ShoppingCart } from "@/feature/cart/shopping-cart";
import { Footer } from "@/components/layout/footer";

export default function CategoryPage() {
  return (
    <div className="flex size-full justify-center bg-gray-100 pb-[52px]">
      <div className="flex w-[360px] flex-col bg-white">
        <ShoppingCart />
      </div>
      <Footer />
    </div>
  );
}
