interface ProductImageProps {
  imageUrls: string[]; // imageUrl은 문자열 배열 타입
}

export default function ProductImage({ imageUrls }: ProductImageProps) {
  if (!imageUrls || imageUrls.length === 0) {
    // 데이터가 아직 로드되지 않았을 때
    return (
      <div className="flex items-center justify-center bg-gray-50">
        <p>Loading...</p> {/* 로딩 메시지 또는 스켈레톤 UI */}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="p-4 max-w-xs">
        {" "}
        {/* 최대 너비를 더 작게 설정 */}
        <img
          src={imageUrls[0]}
          alt="Product"
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
