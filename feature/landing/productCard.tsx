import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import myApi from "@/lib/axios";

type ProductCard = {
  id: number;
  name: string;
  imageUrls: string[];
  description: string;
  price: number;
  discount: number;
};

export default function CarouselImages() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductCard[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await myApi("/product/discount/WEEKEND_SPECIAL");
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

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - price * (discount / 100);
  };

  return (
    <div className="flex justify-center items-center">
    <div className="overflow-x-auto">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group relative w-[320px] rounded-md overflow-hidden shadow-lg"
          onClick={() => goToDetailPage(product.id)} // 클릭 시 상세 페이지로 이동
        >
          {/* 주말특가 배너 */}
          <div className="absolute z-10 flex h-[24px] w-[60px] items-center justify-center bg-[#0DBD88] text-[13px] font-medium text-white">
            주말특가
          </div>

          {/* 상품 이미지 */}
          <CardContent className="p-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={product.imageUrls[0]} // 첫 번째 이미지를 사용
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-4 right-4 rounded-full opacity-90 hover:opacity-100"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>

            {/* 상품 정보 */}
            <div className="p-4">
              <h3 className="text-muted-foreground mb-2 text-sm">
                뷰앤 굿몰 속 진한 매력! (양지 포함)
              </h3>
              <h2 className="mb-2 font-medium">{product.name}</h2>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-red-500">
                  {product.discount}%
                </span>
                <span className="text-lg font-bold">
                  {calculateDiscountedPrice(product.price, product.discount).toLocaleString()}원
                </span>
                <span className="text-muted-foreground text-sm line-through">
                  {product.price.toLocaleString()}원
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-muted-foreground text-sm">후기</span>
                <span className="text-sm">0</span> {/* 후기 수를 실제 값으로 교체 */}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  );
}