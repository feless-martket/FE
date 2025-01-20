import TimeDisplay from "@/feature/landing/timeDisplay";

export default function WeekendSaleSection() {
  return (
    <div className="mb-4 flex flex-col justify-between p-4">
      <div className="mb-[20px]">
        <h2 className="mb-[5px] text-lg font-bold tracking-tighter text-[#333333]">
          주말특가
        </h2>
        <h6 className="text-xs font-medium tracking-tighter text-[#7F7F7F]">
          48시간 한정 특가!
        </h6>
      </div>
      {/* 실시간 시간 표시 */}
      <TimeDisplay />
    </div>
  );
}
