import HeroSlider from "../../feature/landing/slider";

import MarketHeader from "@/feature/landing/marketHeader";
import NavBar from "@/feature/landing/navBar";
import SaleSection from "@/feature/landing/saleSection";
import CarouselImages from "@/feature/landing/carouselImages";
import WeekendSaleSection from "@/feature/landing/weekendSaleSection";
import { ProductCard } from "@/feature/landing/productCard";
import { products as dummy } from "@/lib/dummy/products";

// feat/Landing 측에서 추가된 이미지 및 Footer 임포트
import { Footer } from "@/components/layout/footer";

// develop 측에서 추가된 변수 (REVIEW)
const products = dummy;

export default function Page() {
  // const buttonLabels = ["추천", "신상품", "베스트", "알뜰쇼핑", "특가/혜택"];

  return (
    <div className="flex size-full justify-center bg-gray-100">
      <div className="bg-wh ite w-[360px]">
        {/* 헤더 */}
        <MarketHeader />

        {/* 상단 메뉴 */}
        <NavBar />

        {/* 이벤트 slider */}
        <HeroSlider />

        {/* 마감 세일 */}
        <SaleSection />

        {/* 세일 상품들 */}
        <CarouselImages />

        {/* 주말 특가 상품 */}
        <WeekendSaleSection />

        {/* 상품 리스트 렌더링 */}
        <div className="flex flex-col gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {/* 하단 푸터 */}
        <Footer />
      </div>
    </div>
  );
}
