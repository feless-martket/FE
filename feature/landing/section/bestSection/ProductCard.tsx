import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import {
  deliveries,
  type ProductResponseDto,
} from "@/feature/landing/section/bestSection/bestProductService";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  addLike,
  cancelLike,
  checkIsLiked,
} from "@/feature/liked/api/liked-api";
import { SecondModal } from "@/components/modal/secondmodal";

interface ProductCardProps {
  product: ProductResponseDto;
  index: number;
  onLikeUpdate: (productId: number, newLikeCount: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onLikeUpdate,
}) => {
  const isTopThree = index < 3;
  const finalPrice = product.discount
    ? Math.floor(product.price * (1 - product.discount / 100))
    : product.price;

  const deliveryOption = deliveries.find((d) => d.value === product.delivery);
  const deliveryLabel = deliveryOption
    ? deliveryOption.label
    : product.delivery;

  const router = useRouter();
  const auth = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(product.likeCount);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (auth?.isLoggedIn && auth?.userInfo) {
      checkIsLiked(auth.userInfo.username, product.id)
        .then((liked) => {
          setIsLiked(liked);
        })
        .catch((error) => {
          console.error("찜 여부 확인 실패:", error);
        });
    }
  }, [auth, product.id]);

  const handleLikeToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!auth?.isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (isLiked) {
        const response = await cancelLike(auth.userInfo!.username, product.id);
        if (response.success) {
          setIsLiked(false);
          const newLikeCount = Math.max(likeCount - 1, 0);
          setLikeCount(newLikeCount);
          onLikeUpdate(product.id, newLikeCount);
        } else {
          alert(response.message || "찜 취소에 실패했습니다.");
        }
      } else {
        const response = await addLike(auth.userInfo!.username, product.id);
        if (response.success) {
          setIsLiked(true);
          const newLikeCount = likeCount + 1;
          setLikeCount(newLikeCount);
          onLikeUpdate(product.id, newLikeCount);
        } else {
          alert(response.message || "찜 추가에 실패했습니다.");
        }
      }
    } catch (error: any) {
      console.error("찜 토글 실패:", error);
      alert("찜 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <Link href={`/productDetail/${product.id}`} className="block">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrls[0] || "/mooni.png"}
            alt={product.name}
            fill
            sizes="(max-width: 360px) 100vw, 360px"
            className="rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
            priority={index < 2}
          />
          {isTopThree && (
            <Badge
              className={`absolute left-3 top-3 rounded-full px-2 py-1 text-xs font-semibold ${
                index === 0
                  ? "bg-rose-500 text-white"
                  : index === 1
                    ? "bg-orange-500 text-white"
                    : "bg-yellow-500 text-gray-800"
              }`}
            >
              {index + 1}위
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="mb-1 text-xs font-medium text-gray-500">
            {deliveryLabel}
          </div>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-green-600">
            {product.name}
          </h3>
          <div className="flex items-baseline space-x-2">
            {product.discount && (
              <span className="text-sm font-bold text-rose-500">
                {product.discount}%
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              {finalPrice.toLocaleString()}원
            </span>
          </div>
          {product.discount && (
            <p className="mt-1 text-xs text-gray-400 line-through">
              {product.price.toLocaleString()}원
            </p>
          )}
        </div>
      </Link>
      <button
        onClick={handleLikeToggle}
        className="absolute bottom-3 right-3 flex items-center justify-center rounded-full bg-white p-2 transition-all duration-300 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label={isLiked ? "찜 취소하기" : "찜하기"}
      >
        <Heart
          className={`size-5 transition-all duration-300 ${
            isLiked
              ? "fill-green-500 text-green-500"
              : "fill-transparent text-green-500"
          }`}
        />
        <span className="ml-1 text-xs font-medium text-gray-600">
          {likeCount}
        </span>
      </button>

      {showLoginModal && (
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              로그인이 필요합니다
            </h2>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowLoginModal(false)}
                className="rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                취소
              </button>
              <button
                onClick={() => router.push("/login")}
                className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
