"use client";

import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";

interface FindIdSuccessProps {
  username?: string;
}

export function FindIdSuccess({ username = "examId" }: FindIdSuccessProps) {
  return (
    <div className="px-4 py-6">
      <div className="mb-12 space-y-2 text-center">
        <h2 className="text-lg font-medium">고객님의 계정을 찾았습니다.</h2>
        <p className="text-gray-600 text-sm">아이디 확인 후 로그인 해주세요.</p>
      </div>

      <div className="flex flex-col items-center mb-12">
        <UserCircle2 className="w-16 h-16 text-gray-300 mb-4" />
        <span className="text-lg">{username}</span>
      </div>

      <div className="space-y-2">
        <Link href="/find-password" className="block">
          <Button
            variant="outline"
            className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-50"
          >
            비밀번호 찾기
          </Button>
        </Link>
        <Link href="/login" className="block">
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
            로그인
          </Button>
        </Link>
      </div>
    </div>
  );
}
