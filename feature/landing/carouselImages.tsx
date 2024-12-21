// pages/landing/CarouselImages.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

import Test1 from "/public/img/test1.jpeg";
import Test2 from "/public/img/test2.jpeg";
import Test3 from "/public/img/test3.jpeg";

export default function CarouselImages() {
  return (
    <Carousel>
      <CarouselContent className="h-[271px] gap-3">
        <CarouselItem className="basis-1/3 ml-2">
          <Image className="h-44 w-[126px]" src={Test1} alt={""} />
          <ul>
            test1
            <li>test</li>
            <li>test</li>
          </ul>
        </CarouselItem>

        <CarouselItem className="basis-1/3 ml-2">
          <Image className="h-44 w-[126px]" src={Test2} alt={""} />
          <ul>
            test2
            <li>test</li>
            <li>test</li>
          </ul>
        </CarouselItem>

        <CarouselItem className="basis-1/3 ml-2">
          <Image className="h-44 w-[126px]" src={Test3} alt={""} />
          <ul>
            test3
            <li>test</li>
            <li>test</li>
          </ul>
        </CarouselItem>

        <CarouselItem className="basis-1/3 ml-2">
          <Image className="h-44 w-[126px]" src={Test1} alt={""} />
          <ul>
            test4
            <li>test</li>
            <li>test</li>
          </ul>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
