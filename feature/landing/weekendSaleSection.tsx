import TimeDisplay from "@/feature/landing/timeDisplay";

export default function WeekendSaleSection() {
  return (
    <div className="mb-4 flex flex-col justify-between p-4">
      <ul className="mb-[20px]">
        <li>
          <h2 className="mb-[5px] text-lg font-bold">주말특가</h2>
        </li>
        <li>
          <h6 className="text-xs font-bold text-gray-500">48시간 한정 특가</h6>
        </li>
      </ul>
      {/* 실시간 시간 표시 */}
      <TimeDisplay />
    </div>
  );
}
