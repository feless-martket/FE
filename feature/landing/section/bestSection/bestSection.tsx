"use client";

import { useState, useEffect } from "react";
import { Crown } from "lucide-react";
import {
  fetchBestLikedProducts,
  type ProductResponseDto,
} from "@/feature/landing/section/bestSection/bestProductService";
import SkeletonCard from "@/feature/landing/section/bestSection/SkeletonCard";
import ProductCard from "@/feature/landing/section/bestSection/ProductCard";

const BestSection: React.FC = () => {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await fetchBestLikedProducts(10);
        setProducts(fetchedProducts);
      } catch (err: any) {
        console.error("베스트 상품 불러오기 오류:", err);
        setError("인기 상품을 불러오는 데 실패했습니다.");
        alert("인기 상품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestProducts();
  }, []);

  return (
    <div className="px-4 py-6 bg-gray-50">
      <div className="mb-8 text-center">
        <Crown className="mx-auto mb-4 h-8 w-8 text-yellow-400" />
        <h2 className="text-2xl font-bold">BEST 상품 TOP 10</h2>
        <p className="mt-2 text-sm text-gray-600">
          가장 인기 있는 상품을 만나보세요
        </p>
      </div>

      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {!loading && (
        <div className="divide-y divide-gray-100 bg-white rounded-lg overflow-hidden shadow">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSection;
