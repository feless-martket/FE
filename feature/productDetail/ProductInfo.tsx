import { FiArrowDown } from "react-icons/fi"; // Import the arrow-down icon

interface ProductInfo {
  productName: string;
  productPrice: number; 
  productDiscount?: number|null;
  productdescription:string;
}

const Price = (price: number): string => {
  return new Intl.NumberFormat().format(price); 
};

  const calculateFinalPrice = (price: number, discount:number) => {
    const finalPrice = price - (price * (discount / 100));
    return new Intl.NumberFormat().format(finalPrice); // 천 단위로 콤마 추가
  };


export default function ProductInfo({
  productName,
  productPrice,
  productDiscount,
  productdescription
}: ProductInfo) {
  return (
    <div className="p-4">
      <p className="text-gray-500 ">샛벌배송</p>
      <h2 className="text-xl font-bold">{productName}</h2>
      <p className="text-gray-500 ">{productdescription}</p>
      <div className="space-y-1">
        {productDiscount !== null && productDiscount !== undefined ? (
          // 할인 정보가 있을 경우
          <>
            <p className="mt-2 text-lg font-bold">
              <span className="text-red-600">{productDiscount}%</span>{" "}
              <span className="text-black">
                {calculateFinalPrice(productPrice, productDiscount)}원
              </span>
            </p>
            <p className="text-gray-500 line-through">
              {Price(productPrice)}원
            </p>
          </>
        ) : (
          // 할인 정보가 없을 경우
          <p className="mt-2 text-lg font-bold">
          <span className="text-lg font-bold">{Price(productPrice)}원</span>
          </p>
        )}
       
      </div>
      <p className="text-sm font-bold text-green-500">적립 제외 상품입니다.</p>
      <button className="mt-2 flex w-full items-center justify-center space-x-2 rounded border-2 border-green-500 px-4 py-3 font-bold text-green-500">
        <span>기저귀 10% 카드쿠폰 다운받기</span>
        <FiArrowDown /> {/* Add the arrow-down icon */}
      </button>
    </div>
  );
}
