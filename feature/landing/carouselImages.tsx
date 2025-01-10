// pages/landing/CarouselImages.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseURL } from "@/lib/axios";
import Test1 from "/public/img/test1.jpeg";
import Test2 from "/public/img/test2.jpeg";
import Test3 from "/public/img/test3.jpeg";

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
};

export default function CarouselImages() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(baseURL + "/product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
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
            <Image
              className="h-44 w-[126px]"
              src={Test1}
              alt={product.name}
              width={126}
              height={176}
            />
            <ul>
              <li className="font-bold">{product.name}</li>
              <li className="text-xs">{product.description}</li>
            </ul>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
