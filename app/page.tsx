"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/landing");
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <Button
        className="mt-16 size-40 bg-[#0DBD88] font-extrabold text-white"
        size="lg"
        onClick={handleButtonClick}
      >
        마켓컬리 팀 <br /> 메인 페이지 이동
      </Button>
    </div>
  );
}
