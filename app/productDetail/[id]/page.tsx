// app/productDetail/[id]/page.tsx

import ProductHeader from "@/feature/productDetail/ProductHeader";
import ProductImage from "@/feature/productDetail/ProductImage";
import PurchaseButton from "@/feature/productDetail/PurchaseButton";
import Home from "@/feature/productDetail/Home";
import ProductDetails from "@/feature/productDetail/ProductDetails";
import ProductInfo from "@/feature/productDetail/ProductInfo";
import DeliveryInfo from "@/feature/productDetail/DeliveryInfo";
import ProductImages from "@/feature/productDetail/ProductImages";
import { Footer } from "@/components/layout/footer";
import { baseURL } from "@/lib/axios";
// 상품 데이터 타입 정의
interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  productStatus: string;
  mainCategory: string;
  subCategory: string;
  imageUrl: string[];
}

// Dynamic Route에서 id 가져오기
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // URL에서 id 추출

  // 서버 요청
  const res = await fetch(baseURL + `/product/${id}`);

  // 요청 실패 시 처리
  if (!res.ok) {
    return (
      <div className="mx-auto max-w-md bg-white py-8 text-center">
        <p>상품 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 요청 성공 시 데이터 처리
  const productData: ProductData = await res.json();
  console.log(productData);

  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100">
      <div className="mx-auto max-w-[360px] bg-white">
        <ProductHeader productName={productData.name} />
        <Home />
        <ProductImage imageUrl={productData.imageUrl} />
        <ProductInfo
          productName={productData.name}
          productPrice={productData.price}
        />
        <DeliveryInfo />
        <ProductDetails />
        <ProductImages imageUrl={productData.imageUrl} />
        <PurchaseButton cartItemId={Number(id)} />
        <Footer />
      </div>
    </div>
  );
}
