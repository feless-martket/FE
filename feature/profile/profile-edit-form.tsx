"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Modal } from "@/components/modal/modal";

export function ProfileEditForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 제출 로직 추가
    console.log("Form submitted:", { name, email, phone });
  };

  const handleWithdraw = () => {
    console.log("회원 탈퇴 처리");
    setShowDeleteModal(false);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mt-2 space-y-4">
        <div>
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div>
          <Label htmlFor="phone">전화번호</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="전화번호를 입력하세요"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600"
        >
          저장하기
        </Button>
      </form>

      <div className="mt-4">
        <Link
          href="/change-password"
          className="flex items-center justify-between border-b border-gray-200 py-4"
        >
          <span>비밀번호 변경</span>
          <ChevronRight className="size-5 text-gray-400" />
        </Link>
      </div>

      <div className="mt-8">
        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
          onClick={() => {
            console.log("회원탈퇴 요청");
            setShowDeleteModal(true);
          }}
        >
          회원탈퇴
        </Button>
      </div>
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        message="탈퇴하면 현재 계정으로 작성한 글, 댓글 등을 수정하거나 삭제할 수 없어요. 정말 탈퇴하시겠어요?"
      >
        <Button
          onClick={handleWithdraw}
          className="w-full mt-4 bg-emerald-500 text-white hover:bg-emerald-600"
        >
          탈퇴하기
        </Button>
      </Modal>
    </div>
  );
}
