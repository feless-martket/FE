"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SecondModal } from "@/components/modal/secondmodal";
import { DeleteMemberRequest } from "@/feature/profile/types/api.type";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { deleteMember } from "@/feature/profile/api/user-api";

export function ProfileEditForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();
  const { userInfo } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 제출 로직 추가
    // 회원 수정 로직 등
    console.log("Form submitted:", { name, email, phone });
  };

  async function handleWithdraw() {
    try {
      setShowDeleteModal(false);

      // 1) 로컬 스토리지에서 accessToken 가져오기
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인 정보가 없습니다. 다시 로그인 해 주세요.");
        return;
      }

      // 현재 로그인한 사용자 이름
      const username = userInfo?.username;
      if (!username) {
        alert("사용자 정보를 가져올 수 없습니다.");
        return;
      }

      // 2) 탈퇴 요청 바디 구성
      const requestBody: DeleteMemberRequest = {
        username: username,
      };

      const res = await deleteMember(token, requestBody);

      if (res.success) {
        alert(res.message || "회원 탈퇴가 완료되었습니다.");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
      } else {
        alert(res.message || "회원 탈퇴 실패");
      }
    } catch (error: any) {
      console.error("회원탈퇴 오류:", error.message);
      alert(error.message || "회원 탈퇴 중 오류가 발생했습니다.");
    }
  }

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
        {/* 탈퇴하기 버튼 */}
        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
          onClick={() => {
            console.log("회원탈퇴 요청");
            setShowDeleteModal(true); // 모달 열기
          }}
        >
          회원탈퇴
        </Button>
      </div>
      {/* SecondModal 사용 */}
      <SecondModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)} // 모달 닫기
        title="정말 탈퇴 하시겠어요?"
        description="탈퇴하면 현재 계정으로 작성한 글, 댓글 등을 수정하거나 삭제할 수 없어요."
        confirmText="탈퇴하기"
        cancelText="취소"
        onConfirm={handleWithdraw} // 탈퇴 로직 실행
      />
    </div>
  );
}
