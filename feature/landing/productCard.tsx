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
    <Card className="group relative mx-auto w-full max-w-[320px] overflow-hidden">
      {isWeekendSale && (
        <div className="absolute left-1 top-1 z-10 rounded-md bg-emerald-500 px-3 py-1 text-sm font-medium text-white">
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
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="text-sm text-muted-foreground mb-2">
            뷰앤 굿몰 속 진한 매력! (양지 포함)
          </h3>
          <h2 className="font-medium mb-2">{title}</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-red-500 font-bold">
              {discountPercentage}%
            </span>
            <span className="font-bold text-lg">
              {discountedPrice.toLocaleString()}원
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice.toLocaleString()}원
            </span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-sm text-muted-foreground">후기</span>
            <span className="text-sm">{reviewCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

