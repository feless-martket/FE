"use client";

import { Modal } from "@/components/modal/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPwApi } from "@/feature/reset-password/api/reset-password-api";
import { Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function ResetPasswordSuccess() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // 쿼리에서 username과 email 추출
  const username = searchParams.get("username");
  const email = searchParams.get("email");

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      setModalMessage("새 비밀번호를 입력해주세요.");
      setShowModal(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalMessage("비밀번호가 다릅니다.");
      setShowModal(true);
      return;
    }

    try {
      await resetPwApi.resetPassword(username!, email!, newPassword);
      setModalMessage("비밀번호 변경 완료");
      setShowModal(true);
    } catch (error: any) {
      console.error(error);

      // 서버에서 보낸 에러 메세지 추출
      const errorMsg =
        error.response?.data || "비밀번호 변경 중 오류가 발생했습니다.";

      // 에러 메세지를 모달에 설정
      setModalMessage(errorMsg);
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    if (modalMessage === "비밀번호 변경 완료") {
      router.push("/login");
    }
  };

  return (
    <div className="px-4 py-6">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* 새 비밀번호 등록 */}
        <div className="relative">
          <Label htmlFor="newPassword">새 비밀번호 등록</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호를 입력해주세요"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 flex items-center"
              onMouseDown={() => setShowNewPassword(true)} // 버튼 누를 때 보이기
              onMouseUp={() => setShowNewPassword(false)} // 버튼에서 손 뗄 때 숨기기
              onMouseLeave={() => setShowNewPassword(false)} // 마우스가 버튼 밖으로 나갔을 때 숨기기
            >
              <Eye className="size-5 text-gray-500 text-opacity-50" />
            </button>
          </div>
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="relative">
          <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="새 비밀번호를 한번 더 입력해주세요"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 flex items-center"
              onMouseDown={() => setShowConfirmPassword(true)} // 버튼 누를 때 보이기
              onMouseUp={() => setShowConfirmPassword(false)} // 버튼에서 손 뗄 때 숨기기
              onMouseLeave={() => setShowConfirmPassword(false)} // 마우스가 버튼 밖으로 나갔을 때 숨기기
            >
              <Eye className="size-5 text-gray-500 text-opacity-50" />
            </button>
          </div>
        </div>

        {/* 확인 버튼 */}
        <Button
          type="button"
          className={`w-full ${
            newPassword && confirmPassword
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "cursor-not-allowed bg-gray-200"
          }`}
          disabled={!newPassword || !confirmPassword}
          onClick={handleSubmit}
        >
          확인
        </Button>
      </form>

      {/* 모달 */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
