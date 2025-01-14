interface ProductImagesProps {
  imageUrl: string[]; // imageUrl은 문자열 배열 타입
}

// ProductImages 컴포넌트 수정: 첫 번째 이미지를 제외한 나머지 이미지를 렌더링
export default function ProductImages({ imageUrl }: ProductImagesProps) {
  console.log(imageUrl); // 배열 내용 확인
  return (
    <div className="flex flex-col items-center justify-start h-auto bg-gray-50 p-4 space-y-4">
      {imageUrl.slice(1).map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Product ${index + 2}`} // 첫 번째 이미지를 제외했으므로 +2로 설정
          className="rounded-lg"
        /> 
      ))}
    </div>
  );
}
