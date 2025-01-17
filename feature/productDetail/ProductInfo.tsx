import { FiArrowDown } from "react-icons/fi"; // Import the arrow-down icon

interface ProductInfo {
  productName: string;
  productPrice: number; // imageUrl은 문자열 타입
}

export default function ProductInfo({
  productName,
  productPrice,
}: ProductInfo) {
  return (
    <div className="p-4">
      <p className="text-gray-500 ">샛벌배송</p>
      <h2 className="text-xl font-bold">{productName}</h2>
      <p className="mt-2 text-lg font-bold">
        <span className="text-red-600">35%</span>
        <span className="text-black"> {productPrice}원</span>
      </p>
      <p className="text-gray-500 line-through">{productPrice}원</p>
      <p className="text-sm font-bold text-green-500">적립 제외 상품입니다.</p>
      <button className="mt-2 flex w-full items-center justify-center space-x-2 rounded border-2 border-green-500 px-4 py-3 font-bold text-green-500">
        <span>기저귀 10% 카드쿠폰 다운받기</span>
        <FiArrowDown /> {/* Add the arrow-down icon */}
      </button>
    </div>
  );
}
