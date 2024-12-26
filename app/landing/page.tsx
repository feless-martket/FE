import HeroSlider from "../../feature/landing/slider";

import MarketHeader from "@/feature/landing/marketHeader";
import NavBar from "@/feature/landing/navBar";
import SaleSection from "@/feature/landing/saleSection";
import CarouselImages from "@/feature/landing/carouselImages";
import WeekendSaleSection from "@/feature/landing/weekendSaleSection";
import { ProductCard } from "@/feature/landing/productCard";

import Test1 from "@/public/img/test1.jpeg";
import Test2 from "@/public/img/test2.jpeg";
import Test3 from "@/public/img/test3.jpeg";
import { Footer } from "@/components/layout/footer";

export default function Page() {
  // const buttonLabels = ["추천", "신상품", "베스트", "알뜰쇼핑", "특가/혜택"];

  const products = [
    {
      image: Test1,
      title: "[누터스가든] CAT 누터스픽 짜먹는 간식 2종",
      originalPrice: 6900,
      discountedPrice: 4480,
      discountPercentage: 35,
      reviewCount: 86,
      isWeekendSale: true,
    },
    {
      image: Test2,
      title: "[누터스가든] CAT 누터스픽 짜먹는 간식 2종",
      originalPrice: 6900,
      discountedPrice: 4480,
      discountPercentage: 35,
      reviewCount: 86,
      isWeekendSale: true,
    },
    {
      image: Test3,
      title: "[누터스가든] CAT 누터스픽 짜먹는 간식 2종",
      originalPrice: 6900,
      discountedPrice: 4480,
      discountPercentage: 35,
      reviewCount: 86,
      isWeekendSale: true,
    },
  ];

  return (
    <div className="flex size-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white">
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
        <div className="flex flex-col gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
