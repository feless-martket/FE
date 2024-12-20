"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/header";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto w-[360px] rounded-lg bg-white px-4 py-6">
      {/* Header */}
      <Header title="로그인" />

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
        >
          로그인
        </Button>

        <Button variant="outline" className="w-full py-6" size="lg">
          회원가입
        </Button>

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
          className="w-full bg-[#FEE500] py-6 text-black hover:bg-[#FDD800]"
          size="lg"
        >
          카카오로 시작하기
        </Button>
      </div>
    </div>
  );
}
