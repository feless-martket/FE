// pages/landing/CarouselImages.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import myApi from "@/lib/axios";

type Product = {
  id: number;
  name: string;
  imageUrls: string[];
  description: string;
  price: number;
  discount: number;
};

const Price = (price: number): string => {
  return new Intl.NumberFormat().format(price);
};

const calculateFinalPrice = (price: number, discount: number) => {
  const finalPrice = price - price * (discount / 100);
  return new Intl.NumberFormat().format(finalPrice); // 천 단위로 콤마 추가
};

export default function CarouselImages() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await myApi("/product/discount/FINAL_SALE");
        if (!response.status) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.data;
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const goToDetailPage = (id: number) => {
    router.push(`/productDetail/${id}`);
  };
  return (
    <Carousel>
      <CarouselContent className="h-[271px] gap-2">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="ml-2 basis-1/3 cursor-pointer"
            onClick={() => goToDetailPage(product.id)}
          >
            {/* 상품 이미지 */}
            <Image
              className="h-44 w-[126px]"
              src={product.imageUrls[0]}
              alt={product.name}
              style={{
                objectFit: "cover",
              }}
              width={126}
              height={176}
            />

            {/* 상품 이름 */}
            <span className="text-[15px] font-medium block w-[120px] overflow-hidden whitespace-nowrap text-ellipsis mb-2">
              {product.name}
            </span>

            {/* 가격 및 할인 정보 */}
            <div>
              <ul>
                <li className="text-xs flex items-center">
                  <span className="text-red-500 text-sm font-bold mr-2">
                    {product.discount}%
                  </span>
                  <span className="text-sm font-bold">
                    {calculateFinalPrice(product.price, product.discount)}원
                  </span>
                </li>
                <li>
                  <span className="mr-2 text-sm font-bold text-gray-500 line-through">
                    {Price(product.price)}원
                  </span>
                </li>
              </ul>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
