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
      <p className="text-gray-400 ">뚝 떨어진 기저귀, 내일 아침 도착!</p>
      <p className="text-lg font-bold mt-2">
        <span className="text-red-600">35%</span>
        <span className="text-black"> {productPrice}원</span>
      </p>
      <p className="text-gray-500 line-through">{productPrice}원</p>
      <p className="text-green-500 text-sm font-bold">적립 제외 상품입니다.</p>
      <button className="mt-2 w-full border-2 border-green-500 text-green-500 px-4 py-3 rounded flex items-center justify-center space-x-2 font-bold">
        <span>기저귀 10% 카드쿠폰 다운받기</span>
        <FiArrowDown /> {/* Add the arrow-down icon */}
      </button>
    </div>
  );
}
