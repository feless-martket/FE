import { Button } from "@/components/ui/button";
import HeroSlider from "../../feature/landing/slider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

import Test1 from "/public/img/test1.jpeg";

export default function Page() {
  // const buttonLabels = ["추천", "신상품", "베스트", "알뜰쇼핑", "특가/혜택"];

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white">
        <header className="h-[51px] bg-[#0DBD88]">
          <text className="absolute left-[calc(50%-35px-125px)] top-[10px] h-[31px] w-[70px] text-[22.52px] font-bold text-white">
            Market
          </text>
        </header>
        <div className="ml-5 flex h-[35px] w-[320px] flex-row gap-[30px] ">
          <button className="font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500">
            추천
          </button>
          <button className="font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500">
            신상품
          </button>
          <button className="font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500">
            베스트
          </button>
          <button className="font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500">
            알뜰쇼핑
          </button>
          <button className="font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500">
            특가/혜택
          </button>
        </div>
        <HeroSlider />
        <section className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">마감세일</h2>
            <Button variant="link" className="p-0 text-sm text-green-500">
              전체보기 {">"}
            </Button>
          </div>
        </section>
        <Carousel>
          <CarouselContent className="bg-slate-600 gap-3 h-[271px]">
            <CarouselItem className="basis-1/3 ">
              <Image src={Test1} alt={""}></Image>
            </CarouselItem>
            <CarouselItem className="basis-1/3 bg-red-500">...</CarouselItem>
            <CarouselItem className="basis-1/3 bg-red-500">...</CarouselItem>
            <CarouselItem className="basis-1/3">...</CarouselItem>
            <CarouselItem className="basis-1/3">...</CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
