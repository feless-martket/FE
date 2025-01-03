export default function ProductDetails() {
  return (
    <div className="p-4 border-t">
      <h3 className="font-bold">상품 정보</h3>
      <div className="flex items-start mt-4">
        <h4 className="w-24 text-gray-500 font-bold">포장타입</h4>
        <div>
          <p>상온 (종이포장)</p>
          <p className="text-sm text-gray-500">
            택배배송은 에코 포장이 스티로폼으로 대체됩니다.
          </p>
        </div>
      </div>
      <div className="flex items-start mt-4">
        <h4 className="w-24 text-gray-500 font-bold">안내사항</h4>
        <p>첫만남이용시 바우처 사용이 가능합니다.</p>
      </div>
    </div>
  );
}
