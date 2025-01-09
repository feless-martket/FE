import HeroSlider from "@/feature/landing/slider";
import MarketHeader from "@/feature/landing/marketHeader";
import NavBar from "@/feature/landing/navBar";

// feat/Landing 측에서 추가된 이미지 및 Footer 임포트
import { Footer } from "@/components/layout/footer";

// develop 측에서 추가된 변수 (REVIEW)
// const products = dummy;

export default function Page() {
  return (
    <div className="flex size-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white">
        {/* 헤더 */}
        <MarketHeader />

        {/* 상단 메뉴 */}
        <div className="grow overflow-y-auto">
          <NavBar />
        </div>

        {/* 하단 푸터 */}
        <Footer />
      </div>
    </div>
  );
}
