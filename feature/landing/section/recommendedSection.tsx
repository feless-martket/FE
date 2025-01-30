import CarouselImages from "@/feature/landing/carouselImages";
import ProductCard from "@/feature/landing/productCard";
import SaleSection from "@/feature/landing/saleSection";
import HeroSlider from "@/feature/landing/slider";
import WeekendSaleSection from "@/feature/landing/weekendSaleSection";

export default function RecommendedSection() {
  return (
    <div className="flex size-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white ">
        {/* 이벤트 slider */}
        <HeroSlider />

        {/* 마감 세일 */}
        <SaleSection />

        {/* 세일 상품들 */}
        <CarouselImages />

        {/* 주말 특가 상품 */}
        <WeekendSaleSection />

        {/* 상품 리스트 렌더링 */}
        <ProductCard></ProductCard>
      </div>
    </div>
  );
}
