export default function DeliveryInfo() {
  return (
    <div className="p-4 border-t">
      <div className="flex items-start">
        <h3 className="font-bold w-20 text-gray-500">배송</h3>
        <div>
          <p>샛별배송</p>
          <p className="text-sm text-gray-500">
            23시 전 주문 시 내일 아침 7시 전 도착
            <br />
            (대구, 부산, 울산 샛별배송 운영시간 별도 확인)
          </p>
        </div>
      </div>
      <div className="flex items-start mt-4">
        <h3 className="font-bold w-20 text-gray-500">판매자</h3>
        <p>마켓</p>
      </div>
    </div>
  );
}
