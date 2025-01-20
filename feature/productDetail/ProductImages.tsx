interface ProductImagesProps {
  imageUrl: string[]; // imageUrl은 문자열 배열 타입
}

export default function ProductImages({ imageUrl }: ProductImagesProps) {
  console.log(imageUrl); // 이 줄로 imageUrl 배열을 확인

  return (
    <div className="flex flex-col items-center justify-start h-auto bg-white p-4 space-y-4">
      {/* 첫 번째 이미지를 제외한 나머지 이미지를 표시 */}
      {imageUrl.slice(1).map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Product ${index + 2}`}
          className="rounded-lg max-w-xs shadow-lg"
        />
      ))}
      {/* 마지막 이미지 아래에 더 많은 여유 공간 추가 */}
      <div className="h-32"></div> {/* h-32는 8rem (128px) */}
    </div>
  );
}
