import { ShoppingCart } from "@/feature/cart/shopping-cart";

export default function CategoryPage() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="flex w-[360px] flex-col bg-white">
        <ShoppingCart></ShoppingCart>
      </div>
    </div>
  );
}
