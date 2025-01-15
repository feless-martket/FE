import { PageLayout } from "@/components/layout/pagelayout";
import { ShoppingCart } from "@/feature/cart/shopping-cart";
import { Footer } from "@/components/layout/footer";

export default function CategoryPage() {
  return (
    <PageLayout>
      <ShoppingCart />
      <Footer />
    </PageLayout>
  );
}
