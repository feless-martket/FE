// app/productDetail/page.tsx

import ProductHeader from "@/feature/productDetail/ProductHeader";
import ProductImage from "@/feature/productDetail/ProductImage";
import PurchaseButton from "@/feature/productDetail/PurchaseButton";
import Home from "@/feature/productDetail/Home";
import ProductDetails from "@/feature/productDetail/ProductDetails";
import ProductInfo from "@/feature/productDetail/ProductInfo";
import DeliveryInfo from "@/feature/productDetail/DeliveryInfo";
import ProductImages from "@/feature/productDetail/ProductImages";
// 상품 데이터 타입 정의
interface ProductData {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

export default async function ProductPage() {
  // POST 요청 설정
  const res = await fetch("http://localhost:8080/product/getProduct/6", {
    method: "POST", // POST 요청으로 변경
    headers: {
      "Content-Type": "application/json", // JSON 형식으로 데이터 전송
    },
    body: JSON.stringify({ id: 1 }), // 필요한 경우 추가 데이터를 body에 포함
    cache: "no-store", // 항상 최신 데이터를 가져오기 위해 캐시 비활성화
  });

  // 요청 실패 시 에러 처리
  if (!res.ok) {
    return (
      <div className="max-w-md mx-auto bg-white text-center py-8">
        <p>상품 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 요청 성공 시 데이터 처리
  const productData: ProductData = await res.json();

  return (
    <div className="max-w-md mx-auto bg-white">
      <ProductHeader productName={productData.name} />
      <Home></Home>
      <ProductImage imageUrl={productData.imageUrl} />
      <ProductInfo
        productName={productData.name}
        productPrice={productData.price}
      />
      <DeliveryInfo></DeliveryInfo>
      <ProductDetails></ProductDetails>
      <ProductImages imageUrl={productData.imageUrl} />
      <PurchaseButton />
    </div>
  );
}
