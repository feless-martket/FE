// components/ProductCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import {
  deliveries,
  type ProductResponseDto,
} from "@/feature/landing/section/bestSection/bestProductService";

interface ProductCardProps {
  product: ProductResponseDto;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const isTopThree = index < 3;
  const finalPrice = product.discount
    ? Math.floor(product.price * (1 - product.discount / 100))
    : product.price;

  const deliveryOption = deliveries.find((d) => d.value === product.delivery);
  const deliveryLabel = deliveryOption
    ? deliveryOption.label
    : product.delivery;

  return (
    <Link
      href={`/productDetail/${product.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <div className="relative flex flex-col">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrls[0] || "/mooni.png"}
            alt={product.name}
            fill
            sizes="(max-width: 360px) 100vw, 360px"
            className="object-cover rounded-t-lg"
            priority={index < 2}
          />
          {isTopThree && (
            <Badge
              className={`absolute left-4 top-4 px-2 py-1 text-xs font-semibold rounded ${
                index === 0
                  ? "bg-rose-500 text-white"
                  : index === 1
                    ? "bg-orange-500 text-white"
                    : "bg-yellow-500 text-gray-800"
              }`}
            >
              {index + 1}위
            </Badge>
          )}
          {/* 좋아요 아이콘 추가 */}
          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
            <Heart className="h-4 w-4 text-red-500" />
          </div>
        </div>
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{deliveryLabel}</div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-baseline space-x-2">
            {product.discount && (
              <span className="text-sm font-bold text-rose-500">
                {product.discount}%
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              {finalPrice.toLocaleString()}원
            </span>
          </div>
          {product.discount && (
            <p className="text-xs text-gray-400 line-through">
              {product.price.toLocaleString()}원
            </p>
          )}
          <div className="mt-3 flex items-center text-xs text-gray-500">
            <Heart className="mr-1 h-4 w-4 text-red-500" />
            <span>{product.likeCount}개</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
