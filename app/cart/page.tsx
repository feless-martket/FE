import { ShoppingCart } from "@/feature/cart/shopping-cart";
import { Footer } from "@/components/layout/footer";

export default function CategoryPage() {
  return (
    <div className="flex flex-col justify-center bg-gray-100 pb-[52px]">
      <div className="mx-auto max-w-[360px] bg-white">
        <ShoppingCart />
      </div>
      <Footer />
    </div>
  );
}
