interface ProductImages {
  imageUrl: string; // imageUrl은 문자열 타입
}

export default function ProductImages({ imageUrl }: ProductImages) {
  return (
    <div className="flex flex-col items-center justify-start h-auto bg-gray-50 p-4 space-y-4">
      <img src={imageUrl} alt="Product" className="rounded-lg w-full" />
      <img src={imageUrl} alt="Product" className="rounded-lg w-full" />
      <img src={imageUrl} alt="Product" className="rounded-lg w-full" />
    </div>
  );
}
