import { Modal } from "@/components/modal/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findIdApi } from "@/feature/find-id/api/\bfind-id-api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type VerificationType = "phone" | "email";

/**
 * 아이디 찾기 폼
 * - 이름과 이메일을 입력받아 인증번호 전송/검증
 * - 성공 시 /find-id/success 페이지로 이동 (쿼리 파라미터로 username 전달)
 */

export function FindIdForm() {
  const router = useRouter();

  // 인증 타입 : "phone" or "email"
  const [verificationType, setVerificationType] =
    useState<VerificationType>("phone");

  // 입력 필드 상태
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // email or phone

  // 인증번호 입력창 표시 여부
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  // 타이머
  const [timer, setTimer] = useState<number | null>(null);

  // 모달 표시 여부 & 메세지
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 1) 인증번호 발송 버튼 핸들러
  const handleVerificationRequest = async () => {
    if (!name || !contact) {
      setModalMessage("모든 정보를 입력해주세요");
      setShowModal(true);
      return;
    }

    try {
      if (verificationType === "email") {
        // 이메일 인증번호 발송 API 호출
        const response = await findIdApi.sendEmailCode(name, contact);
        // 예 : r.data = "인증번호가 발송되었습니다."
        console.log(response.data);
      } else {
        // 휴대폰 인증 (미구현)
      }

      // 인증번호 입력창 표시, 타이머 3분 시작
      setShowVerificationInput(true);
      setTimer(180);

      // 안내 모달
      setModalMessage("인증번호가 발송되었습니다.");
      setShowModal(true);
    } catch (error: any) {
      console.error(error);
      // 기본 오류 메세지
      let errMsg = "인증번호 발송 중 오류가 발생했습니다";
      // 서버에서 보내준 메세지
      if (error.response?.data) {
        errMsg = error.response.data;
      }
      setModalMessage(errMsg);
      setShowModal(true);
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
      let response;
      if (verificationType === "email") {
        // 이메일 인증번호 검증 API
        response = await findIdApi.verifyEmailCode(
          name,
          contact,
          verificationCode
        );
      } else {
        // 휴대폰 인증 (미구현)
      }

      // 백엔드가 반환한 아이디
      const username = response?.data;
      // 인증 성공 시, /find-id/success?username===xxx 페이지로 이동
      router.push(`/find-id/success?username=${encodeURIComponent(username)}`);
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
    if (timer === null) return; // 타이머 미작동
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
    return `${String(mins).padStart(2, "0")}: ${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="px-4 pb-4">
      {/* 인증 타입 탭 */}
      <div className="mb-6 flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 text-base ${
            verificationType === "phone"
              ? "border-b-2 border-emerald-500 text-emerald-500"
              : "text-gray-400"
          }`}
          onClick={() => {
            setVerificationType("phone");
            setShowVerificationInput(false);
            setTimer(null);
            setVerificationCode("");
          }}
        >
          휴대폰 인증
        </button>
        <button
          className={`flex-1 py-3 text-base ${
            verificationType === "email"
              ? "border-b-2 border-emerald-500 text-emerald-500"
              : "text-gray-400"
          }`}
          onClick={() => {
            setVerificationType("email");
            setShowVerificationInput(false);
            setTimer(null);
            setVerificationCode("");
          }}
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

        {/* 인증번호 입력창 */}
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

        {/* 인증번호 받기 버튼(처음 상태에서만) */}
        {!showVerificationInput && (
          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleVerificationRequest}
            disabled={showVerificationInput || !name || !contact}
          >
            인증번호 받기
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
