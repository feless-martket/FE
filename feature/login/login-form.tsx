"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/header";
import { loginApiCall } from "@/feature/login/api/login-api";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const goToLanding = () => {
    router.push("/landing");
  };
  const closeButton = (
    <X
      className="absolute left-0 top-1 flex size-6 items-center justify-center"
      onClick={goToLanding}
    />
  );

  /**
   * "로그인" 버튼 클릭 시 실행
   */

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 버튼 클릭 >>>", { id, password });
    try {
      // 백엔드로 로그인 요청
      const data = await loginApiCall(id, password);

      // 응답 데이터: { username, accessToken, refreshToken, message }
      console.log("로그인 성공 >>>", data);

      alert("로그인 성공");
      // 이후 필요한 동작 구현 (페이지 이동 등)
      // 예) router.push("/"), window.location.href="/"
      window.location.href = "/landing";
    } catch (error: any) {
      console.error("로그인 실패>>>", error);

      // 백엔드가 보낸 구체적 에러 메세지가 있는지 확인
      const serverMessage = error.response?.data;
      const alertMessage =
        serverMessage ||
        (error instanceof Error ? error.message : "로그인 중 오류 발생");
      // alert(
      //   `로그인 실패: ${
      //     error instanceof Error ? error.message : "로그인 중 오류 발생"
      //   }`
      // );
      alert(`로그인 실패: ${alertMessage}`);
    }
  };
  return (
    <div>
      <div className={`relative flex h-[64px] items-center justify-center`}>
        <button
          className="absolute left-5 flex h-full items-center justify-center"
          onClick={() => router.back()}
        >
          <X size={24} />
        </button>

        <div className="text-center text-lg font-medium">로그인</div>
      </div>
      <div className={`w-full border`}></div>
      {/* Input Fields */}
      <div className="mt-6 space-y-4 px-5">
        {/* ID Input */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={cn(
              `w-full rounded-md h-[46px] text-sm tracking-tighter`,
              `placeholder:text-[#CCCCCC]`
            )}
          />
          {/* Password Input */}
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              `w-full rounded-md h-[46px] text-sm`,
              `placeholder:text-[#CCCCCC]`
            )}
          />

          <div className="flex flex-col gap-[10px]">
            <Button
              className="w-full bg-emerald-500 py-6 text-white hover:bg-emerald-600"
              size="lg"
              type="submit"
            >
              로그인
            </Button>
            <Link href={"/signup"}>
              <Button
                type="button"
                variant="outline"
                className="w-full py-6"
                size="lg"
              >
                회원가입
              </Button>
            </Link>
          </div>
        </form>

        {/* 아이디/비밀번호 찾기 */}
        <div className="flex justify-center space-x-4 text-xs tracking-tighter text-gray-600">
          <Link href="/find-id" className="hover:underline">
            아이디 찾기
          </Link>
          <div className="text-gray-300">|</div>
          <Link href="/find-password" className="hover:underline">
            비밀번호 찾기
          </Link>
        </div>

        <div className="border border-[#F6F6F6]"></div>

        {/* 카카오 로그인 */}
        <div className="pt-[24px] text-center text-[13px] font-semibold tracking-tighter">
          카카오로 <span className="text-emerald-500">간편하게 시작</span>
          하세요
        </div>

        <Button
          className="w-full bg-[#FEE500] py-6 tracking-tighter text-black hover:bg-[#FDD800]"
          size="lg"
        >
          카카오로 시작하기
        </Button>
      </div>
    </div>
  );
}
