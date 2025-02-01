"use client";

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
import { useState, useEffect } from "react";

// 상품 데이터 타입 정의
interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  productStatus: "AVAILABLE" | "UNAVAILABLE";
  mainCategory: string;
  subCategory: string;
  imageUrls: string[];
  discount: number;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params; // URL에서 id 추출

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(baseURL + `/product/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data: ProductData = await res.json();
        setProductData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    // 로딩 상태에서는 스켈레톤 UI를 보여줌
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-[360px] bg-white p-4">
          {/* 스켈레톤 UI */}
          <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-gray-200"></div>
          <div className="mb-4 h-[200px] w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div className="mb-2 h-6 w-1/2 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  if (!productData) {
    // 데이터 로드 실패 시 처리
    return (
      <div className="mx-auto max-w-md bg-white py-8 text-center">
        <p>상품 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 데이터 로드 성공 시 렌더링
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="mx-auto max-w-[360px] bg-white">
        <ProductHeader productName={productData.name} />
        <Home />
        <ProductImage imageUrls={productData.imageUrls} />
        <ProductInfo
          productName={productData.name}
          productPrice={productData.price}
          productDiscount={productData.discount}
          productdescription={productData.description}
        />
        <DeliveryInfo />
        <ProductDetails />
        <div className="overflow-y-auto bg-gray-50">
          <ProductImages imageUrls={productData.imageUrls} />
        </div>
        <PurchaseButton
          cartItemId={Number(id)}
          productId={Number(id)}
          productStatus={productData.productStatus}
        />
      </div>
      <Footer />
    </div>
  );
}
