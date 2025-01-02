interface ProductImages {
  imageUrl: string; // imageUrl은 문자열 타입
}

export default function ProductImages({ imageUrl }: ProductImages) {
  return (
    <div className="flex flex-col items-center justify-start h-auto bg-gray-50 p-4 space-y-4">
      <img src="/img/baseball1.jpg" alt="Product" className="rounded-lg" />

      <img src="/img/baseball2.jpg" alt="Product" className="rounded-lg" />

      <img src="/img/baseball3.jpg" alt="Product" className="rounded-lg" />

      <img src="/img/baseball4.jpg" alt="Product" className="rounded-lg" />
    </div>
  );
}
