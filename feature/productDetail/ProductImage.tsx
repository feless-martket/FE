interface ProductImageProps {
  imageUrls: string[]; // imageUrl은 문자열 배열 타입
}

export default function ProductImage({ imageUrls }: ProductImageProps) {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="max-w-xs p-4">
        {" "}
        {/* 최대 너비를 더 작게 설정 */}
        <img
          src={imageUrls[0]}
          alt="Product"
          className="h-auto w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
