"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "[하기스] 2023 네이처메이드 기저귀 패키지 3종 (택1)",
    price: 6900,
    discount: 20,
    image: "/img/mooni.png",
  },
  {
    id: 2,
    name: "[하기스] 2023 네이처메이드 기저귀 패키지 3종 (택1)",
    price: 6900,
    image: "/img/mooni2.png",
  },
  {
    id: 3,
    name: "[하기스] 2023 네이처메이드 기저귀 패키지 3종 (택1)",
    price: 6900,
    discount: 20,
    image: "/img/mooni3.png",
  },
  {
    id: 4,
    name: "[하기스] 2023 네이처메이드 기저귀 패키지 3종 (택1)",
    price: 6900,
    image: "/img/mooni4.png",
  },
];

export function LikedProducts() {
  return (
    <div className="p-4">
      <div className="mb-4 text-sm text-gray-600">전체 {products.length}개</div>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex gap-4">
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
              className="rounded-md"
            />
            <div className="flex flex-1 flex-col justify-between py-1">
              <div>
                <div className="line-clamp-2 text-sm">{product.name}</div>
                <div className="mt-1 flex items-center gap-1">
                  {product.discount && (
                    <span className="text-red-500">{product.discount}%</span>
                  )}
                  <span className="font-medium">
                    {product.price.toLocaleString()}원
                  </span>
                  {product.discount && (
                    <span className="text-sm text-gray-400 line-through">
                      {(
                        product.price *
                        (100 / (100 - product.discount))
                      ).toLocaleString()}
                      원
                    </span>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" className="self-end">
                담기
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
