interface ProductImageProps {
  imageUrl: string; // imageUrl은 문자열 타입
}

export default function ProductImage({ imageUrl }: ProductImageProps) {
  return (
    <div className="flex items-center justify-center h-93 bg-gray-50">
      <div className="p-4">
        <img src="/img/baseball2.jpg" alt="Product" className="rounded-lg" />
      </div>
    </div>
  );
}
