import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import myApi from "@/lib/axios";
import { AuthContext } from "@/context/AuthContext";
import {
  addLike,
  cancelLike,
  checkIsLiked,
} from "@/feature/liked/api/liked-api";
import { SecondModal } from "@/components/modal/secondmodal";

type ProductCard = {
  id: number;
  name: string;
  imageUrls: string[];
  description: string;
  price: number;
  discount: number;
};

type ProductCardWithLike = ProductCard & {
  isLiked: boolean;
  likeCount?: number;
};

export default function CarouselImages() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductCardWithLike[]>([]);
  const auth = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await myApi("/product/discount/WEEKEND_SPECIAL");
        if (response.status !== 200) {
          throw new Error("Failed to fetch products");
        }
        const data: ProductCard[] = response.data;

        // 초기 좋아요 상태 설정
        const productsWithLike: ProductCardWithLike[] = await Promise.all(
          data.map(async (product) => {
            let isLiked = false;
            if (auth?.isLoggedIn && auth?.userInfo) {
              try {
                isLiked = await checkIsLiked(
                  auth.userInfo.username,
                  product.id,
                );
              } catch (error) {
                console.error(
                  `찜 여부 확인 실패(상품 ID: ${product.id}):`,
                  error,
                );
              }
            }
            return { ...product, isLiked };
          }),
        );
        setProducts(productsWithLike);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [auth]);

  const goToDetailPage = (id: number) => {
    router.push(`/productDetail/${id}`);
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - price * (discount / 100);
  };

  const handleLikeToggle = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!auth?.isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("권한이 없습니다. 로그인 상태를 확인하세요.");
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
                : p,
            ),
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
                : p,
            ),
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
    <div className="flex items-center justify-center">
      <div className="overflow-x-auto">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group relative w-[320px] overflow-hidden rounded-md shadow-lg"
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
                  onClick={(e) => handleLikeToggle(e, product.id)}
                >
                  <Heart
                    className={`size-5 transition-all duration-300 ${
                      product.isLiked
                        ? "fill-green-500 text-green-500"
                        : "fill-transparent text-green-500"
                    }`}
                  />
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
                    {calculateDiscountedPrice(
                      product.price,
                      product.discount,
                    ).toLocaleString()}
                    원
                  </span>
                  <span className="text-muted-foreground text-sm line-through">
                    {product.price.toLocaleString()}원
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">후기</span>
                  <span className="text-sm">0</span>{" "}
                  {/* 후기 수를 실제 값으로 교체 */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* 로그인 모달 */}
      {showLoginModal && (
        <SecondModal
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="로그인이 필요합니다."
          description="로그인 페이지로 이동하시겠습니까?"
          confirmText="확인"
          cancelText="취소"
          onConfirm={() => {
            setShowLoginModal(false);
            router.push("/login");
          }}
        />
      )}
    </div>
  );
}
