"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  fetchProducts,
  fetchProductsByMainCategory,
} from "@/feature/productList/productList-api";
import { categories } from "@/feature/category/category-list";
import { categoryMapping } from "@/feature/category/category-mapping";
import { mainCategoryMapping } from "@/feature/category/category-mapping";
import { AuthContext } from "@/context/AuthContext";
import {
  checkIsLiked,
  addLike,
  cancelLike,
} from "@/feature/liked/api/liked-api";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  delivery: string;
  category: string;
  discount?: number | null;
  isLiked?: boolean;
  likeCount?: number;
}

export default function ProductList() {
  const searchParams = useSearchParams();
  const mainParam = searchParams.get("main");
  const paramCategory = searchParams.get("category");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const auth = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const currentCategory = categories.find(
    (category) => category.name === mainParam
  );
  const subcategories = currentCategory?.subCategories || [];

  const [selectedTab, setSelectedTab] = useState<string>(() => {
    if (paramCategory && subcategories.includes(paramCategory)) {
      return paramCategory;
    }
    return "전체보기";
  });

  useEffect(() => {
    if (paramCategory && subcategories.includes(paramCategory)) {
      setSelectedTab(paramCategory);
    }
  }, [paramCategory, subcategories]);

  // 상품 목록과 좋아요 상태를 함께 불러오기
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        let totalCount;
        if (selectedTab === "전체보기" && mainParam) {
          const mainCategoryCode = mainCategoryMapping[mainParam] || mainParam;
          const response = await fetchProductsByMainCategory(
            mainCategoryCode,
            currentPage,
            pageSize
          );
          data = response.content;
          totalCount = response.totalElements;
        } else {
          const apiCategory = categoryMapping[selectedTab] || selectedTab;
          const response = await fetchProducts(
            apiCategory,
            currentPage,
            pageSize
          );
          data = response.content;
          totalCount = response.totalElements;
        }

        // 로그인한 경우 각 상품의 좋아요 상태 확인
        if (auth?.isLoggedIn && auth?.userInfo) {
          const productsWithLikeStatus = await Promise.all(
            data.map(async (product) => {
              try {
                const isLiked = await checkIsLiked(
                  auth.userInfo!.username,
                  product.id
                );
                return { ...product, isLiked };
              } catch (error) {
                console.error(
                  `좋아요 상태 확인 실패 (상품 ID: ${product.id}):`,
                  error
                );
                return { ...product, isLiked: false };
              }
            })
          );
          setProducts(productsWithLikeStatus);
        } else {
          setProducts(data.map((product) => ({ ...product, isLiked: false })));
        }

        setTotalPages(Math.ceil(totalCount / pageSize));
      } catch (err: any) {
        setError("상품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [selectedTab, currentPage, auth]);

  const calculateFinalPrice = (price: number, discount: number) => {
    const finalPrice = price - price * (discount / 100);
    return new Intl.NumberFormat().format(finalPrice);
  };

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLikeToggle = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!auth?.isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    try {
      if (product.isLiked) {
        const response = await cancelLike(auth.userInfo!.username, productId);
        if (response.success) {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.id === productId
                ? { ...p, isLiked: false, likeCount: response.likeCount }
                : p
            )
          );
        } else {
          alert(response.message || "찜 취소에 실패했습니다.");
        }
      } else {
        const response = await addLike(auth.userInfo!.username, productId);
        if (response.success) {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.id === productId
                ? { ...p, isLiked: true, likeCount: response.likeCount }
                : p
            )
          );
        } else {
          alert(response.message || "찜 추가에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("찜 토글 실패:", error);
      alert("찜 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Navigation Tabs */}
      <div className="scrollbar-hide mb-4 flex overflow-x-auto whitespace-nowrap border-b">
        {subcategories.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`whitespace-nowrap px-4 py-2 ${
              tab === selectedTab
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center text-gray-500">상품을 불러오는 중...</div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="mb-4 flex items-center justify-between px-4">
        <span className="text-sm text-gray-600">총 {products.length}개</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-sm">
            추천순 <ChevronDown className="ml-1 size-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            필터
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/productDetail/${product.id}`}
            className="block"
          >
            <div className="relative flex flex-col rounded-none bg-white p-2 shadow-sm">
              <div className="relative h-[120px] w-[140px]">
                <Image
                  src={product.imageUrls[0] || "/placeholder.svg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />

                <Button
                  size="icon"
                  variant="secondary"
                  className={`absolute bottom-2 right-2 z-10 rounded-full ${
                    product.isLiked ? "bg-rose-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={(e) => handleLikeToggle(e, product.id)}
                >
                  <Heart
                    className={`size-4 ${product.isLiked ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
              <p className="mb-1 text-xs text-gray-500">{product.delivery}</p>
              <h3 className="mb-1 line-clamp-1 text-sm font-medium text-gray-800">
                {product.name}
              </h3>
              <div className="mb-1 flex items-center">
                {product.discount !== null && product.discount !== undefined ? (
                  <>
                    <span className="mr-1 text-base font-bold text-rose-500">
                      {product.discount}%
                    </span>
                    <span className="text-base font-bold">
                      {calculateFinalPrice(product.price, product.discount)}원
                    </span>
                  </>
                ) : (
                  <span className="text-base font-bold">
                    {product.price.toLocaleString()}원
                  </span>
                )}
              </div>
              {product.discount !== null && product.discount !== undefined && (
                <p className="text-xs text-gray-400 line-through">
                  {product.price.toLocaleString()}원
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          variant="outline"
          size="sm"
        >
          이전
        </Button>
        <span className="text-sm text-gray-600">
          <span className="font-bold text-black">{currentPage + 1}</span> /{" "}
          {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          variant="outline"
          size="sm"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
