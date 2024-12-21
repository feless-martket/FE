export default function NavBar() {
  return (
    <div className="ml-5 flex h-[35px] w-[320px] flex-row gap-[30px]">
      <button className="font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500">
        추천
      </button>
      <button className="font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500">
        신상품
      </button>
      <button className="font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500">
        베스트
      </button>
      <button className="font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500">
        알뜰쇼핑
      </button>
      <button className="font-pretendard text-[14px] font-semibold leading-[17px] -tracking-wider text-gray-500">
        특가/혜택
      </button>
    </div>
  );
}
