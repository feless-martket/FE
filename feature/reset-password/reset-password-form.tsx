"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/modal/modal";
import { useRouter } from "next/navigation";
import { resetPwApi } from "./api/reset-password-api";

type VerificationType = "phone" | "email";

/**
 * 1) username + email 입력 -> 인증번호 발송
 * 2) 인증번호 입력 -> 검증 성공 시 reset-password-success 페이지 이동
 */
export function ResetPasswordForm() {
  const router = useRouter();

  // 인증 타입: phone 인증은 미구현, 이메일 인증만 사용
  const [verificationType, setVerificationType] =
    useState<VerificationType>("email");

  // 입력 필드 상태
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // 인증번호 입력창 표시 여부
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  // 타이머
  const [timer, setTimer] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 모달 표시 여부 & 메세지
  const [modalMessage, setModalMessage] = useState("");

  // "인증번호 받기" 버튼 로딩 상태
  const [isLoadingSend, setIsLoadingSend] = useState(false);

  // 1) 인증번호 발송 버튼 핸들러
  const handleVerificationRequest = async () => {
    if (!username || !email) {
      setModalMessage("모든 정보를 입력해주세요");
      setShowModal(true);
      return;
    }

    if (isLoadingSend) return;
    setIsLoadingSend(true);

    try {
      if (verificationType === "email") {
        const response = await resetPwApi.sendCode(username, email);
        console.log(response.data); // 서버 응답 확인
      } else {
        // 휴대폰 인증 (미구현)
      }

      setShowVerificationInput(true);
      setTimer(180);
      setModalMessage("인증번호가 발송되었습니다.");
      setShowModal(true);
    } catch (error: any) {
      console.error(error);
      let errMsg = "인증번호 발송 중 오류가 발생했습니다.";
      if (error.response?.data) {
        errMsg = error.response.data;
      }
      setModalMessage(errMsg);
      setShowModal(true);
    } finally {
      setIsLoadingSend(false);
    }
  };
  // 2) 인증번호 확인 버튼 핸들러
  const handleCodeVerify = async () => {
    if (!verificationCode) {
      setModalMessage("인증번호를 입력해주세요");
      setShowModal(true);
      return;
    }

    try {
      if (verificationType === "email") {
        await resetPwApi.verifyCode(username, email, verificationCode);
        // 인증 성공 시 /reset-password-success 페이지로 이동
      } else {
        // 휴대폰 인증 (미구현)
      }
      router.push(
        `/reset-password/success?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&code=${encodeURIComponent(verificationCode)}`
      );
    } catch (error: any) {
      console.error(error);
      const errMsg =
        error.response?.data || "인증번호 확인 중 오류가 발생했습니다.";
      setModalMessage(errMsg);
      setShowModal(true);
    }
  };

  // 3) 타이머 동작
  useEffect(() => {
    if (timer === null) return;
    if (timer <= 0) {
      // 시간 만료
      setTimer(null);
      if (showVerificationInput) {
        setModalMessage("인증번호가 만료되었습니다. 다시 시도해주세요.");
        setShowModal(true);
      }
      return;
    }
    const countdown = setInterval(() => {
      setTimer((prev) => (prev !== null ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer, showVerificationInput]);

  // 4) 시/분 포맷
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="px-4 pb-4">
      {/* 인증타입 탭: 휴대폰 인증 버튼 비활성화 */}
      <div className="mb-6 flex border-b border-gray-200">
        <button
          className="flex-1 cursor-not-allowed py-3 text-base text-gray-400"
          disabled
        >
          휴대폰 인증 (준비 중)
        </button>
        <button
          className={`flex-1 py-3 text-base ${
            verificationType === "email"
              ? "border-b-2 border-emerald-500 text-emerald-500"
              : "text-gray-400"
          }`}
          onClick={() => setVerificationType("email")}
        >
          이메일 인증
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="id">아이디</Label>
          <Input
            id="id"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력해주세요"
          />
        </div>

        <div>
          <Label htmlFor="contact">
            {verificationType === "phone" ? "휴대폰 번호" : "이메일"}
          </Label>
          <Input
            id="contact"
            type={verificationType === "phone" ? "tel" : "email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
                onClick={handleCodeVerify}
              >
                인증번호 확인
              </Button>
            </div>
          </div>
        )}

        {!showVerificationInput && (
          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleVerificationRequest}
            disabled={isLoadingSend || !username || !email}
          >
            {isLoadingSend ? "요청 중..." : "인증번호 받기"}
          </Button>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
      />
    </div>
  );
}
