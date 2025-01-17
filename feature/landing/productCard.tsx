import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

interface ProductCardProps {
  image: StaticImageData;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  reviewCount: number;
  isWeekendSale?: boolean;
}

export function ProductCard({
  image,
  title,
  originalPrice,
  discountedPrice,
  discountPercentage,
  reviewCount,
  isWeekendSale = false,
}: ProductCardProps) {
  return (
    <Card className="group relative mx-auto w-full max-w-[320px] overflow-hidden rounded-none">
      {isWeekendSale && (
        <div className="absolute z-10 flex h-[24px] w-[60px] items-center justify-center bg-[#0DBD88] text-[13px] font-medium text-white">
          주말특가
        </div>
      )}
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-4 right-4 rounded-full opacity-90 hover:opacity-100"
          >
            <ShoppingCart className="size-4" />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="text-muted-foreground mb-2 text-sm">
            뷰앤 굿몰 속 진한 매력! (양지 포함)
          </h3>
          <h2 className="mb-2 font-medium">{title}</h2>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-red-500">
              {discountPercentage}%
            </span>
            <span className="text-lg font-bold">
              {discountedPrice.toLocaleString()}원
            </span>
            <span className="text-muted-foreground text-sm line-through">
              {originalPrice.toLocaleString()}원
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-muted-foreground text-sm">후기</span>
            <span className="text-sm">{reviewCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
