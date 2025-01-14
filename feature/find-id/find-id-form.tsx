import { Modal } from "@/components/modal/modal";
import { SecondModal } from "@/components/modal/secondmodal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type VerificationType = "phone" | "email";

export function FindIdForm() {
  const [verificationType, setVerificationType] =
    useState<VerificationType>("phone");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleVerificationRequest = () => {
    if (!name || !contact) {
      setModalMessage("모든 정보를 입력해주세요");
      setShowModal(true);
      return;
    }
    setShowVerificationInput(true);
    setTimer(180);
    setModalMessage("인증번호가 발송되었습니다.");
    setShowModal(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}: ${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="px-4 pb-4">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 py-3 text-base ${
            verificationType === "phone"
              ? "text-emerald-500 border-b-2 border-emerald-500"
              : "text-gray-400"
          }`}
          onClick={() => setVerificationType("phone")}
        >
          휴대폰 인증
        </button>
        <button
          className={`flex-1 py-3 text-base ${
            verificationType === "email"
              ? "text-emerald-500 border-b-2 border-emerald-500"
              : "text-gray-400"
          }`}
          onClick={() => setVerificationType("email")}
        >
          이메일 인증
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`이름을 입력해주세요`}
          />
        </div>

        <div>
          <Label htmlFor="contact">
            {verificationType === "phone" ? "휴대폰 번호" : "이메일"}
          </Label>
          <Input
            id="contact"
            type={verificationType === "phone" ? "tel" : "email"}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={
              verificationType === "phone"
                ? "휴대폰 번호를 입력해주세요"
                : "이메일을 입력해주세요"
            }
          />
        </div>

        {showVerificationInput && (
          <div>
            <Label htmlFor="verificationCode">인증번호</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="인증번호 입력"
                />
                {timer !== null && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                    {formatTime(timer)}
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                className="border-emerald-500 text-emerald-500 hover:bg-emerald-50"
              >
                인증번호 확인
              </Button>
            </div>
          </div>
        )}

        <Button
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleVerificationRequest}
          disabled={showVerificationInput || !name || !contact}
        >
          {verificationType === "phone" ? "인증번호 받기" : "확인"}
        </Button>
      </div>

      {/* <SecondModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="알림"
        description={modalMessage}
        confirmText="확인"
        onConfirm={() => setShowModal(false)}
      /> */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="인증번호가 발송되었습니다."
      />
    </div>
  );
}
