"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/header";
import { loginApiCall } from "@/feature/login/api/login-api";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  /**
   * "로그인" 버튼 클릭 시 실행
   */

  const handleLogin = async () => {
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
    } catch (error) {
      console.error("로그인 실패>>>", error);
      alert(
        `로그인 실패: ${
          error instanceof Error ? error.message : "로그인 중 오류 발생"
        }`,
      );
    }
  };
  return (
    <div className="w-[360px] rounded-lg bg-white px-4 py-6">
      {/* Header */}
      <div className="w-full">
        <Header title="로그인" />
      </div>

      {/* Input Fields */}
      <div className="mt-6 space-y-4">
        {/* ID Input */}
        <Input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full rounded-md px-4 py-3"
        />
        {/* Password Input */}
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md px-4 py-3"
        />

        <Button
          className="w-full bg-emerald-500 py-6 text-white hover:bg-emerald-600"
          size="lg"
          onClick={handleLogin}
        >
          로그인
        </Button>

        <Link href={"/signup"}>
          <Button variant="outline" className="w-full py-6" size="lg">
            회원가입
          </Button>
        </Link>

        {/* 아이디/비밀번호 찾기 */}
        <div className="flex justify-center space-x-4 text-sm text-gray-600">
          <button className="hover:underline">아이디찾기</button>
          <div className="text-gray-300">|</div>
          <button className="hover:underline">비밀번호찾기</button>
        </div>

        {/* 카카오 로그인 */}
        <div className="text-center text-sm">
          카카오로{" "}
          <Link href="#" className="text-emerald-500">
            간편하게 시작
          </Link>
        </div>

        <Button
          className="w-full bg-[#FEE500] py-6 text-black hover:bg-[#FDD800] "
          size="lg"
        >
          카카오로 시작하기
        </Button>
      </div>
    </div>
  );
}
