import { Modal } from "@/components/modal/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findIdApi } from "@/feature/find-id/api/\bfind-id-api";
import { useEffect, useState } from "react";

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
  const [foundId, setFoundId] = useState("");

  // 인증번호 발송 버튼
  const handleVerificationRequest = async () => {
    if (!name || !contact) {
      setModalMessage("모든 정보를 입력해주세요");
      setShowModal(true);
      return;
    }

    try {
      if (verificationType === "email") {
        const res = await findIdApi.sendEmailCode(name, contact);
        // 예 : response.data = "인증번호가 발송되었습니다."
        console.log(res.data);
      } else {
        // 휴대폰 인증 (미구현)
      }
      setShowVerificationInput(true);
      setTimer(180);
      setModalMessage("인증번호가 발송되었습니다.");
      setShowModal(true);
    } catch (error: any) {
      console.error(error);
      const errMsg = error.res?.data || "인증번호 발송 중 오류가 발생했습니다";
      setModalMessage(errMsg);
      setShowModal(true);
    }
  };

  // 인증번호 확인 버튼
  const handleCodeVerify = async () => {
    if (!verificationCode) {
      setModalMessage("인증번호를 입력해주세요");
      setShowModal(true);
      return;
    }

    try {
      let response;
      if (verificationType === "email") {
        response = await findIdApi.verifyEmailCode(
          name,
          contact,
          verificationCode
        );
      } else {
        // 휴대폰 인증 (미구현)
      }

      // 예 : response.data = "찾은 아이디" (문자열)
      console.log("아이디 찾기 성공: ", response?.data);

      // foundId에 저장
      if (response?.data) {
        setFoundId(response.data);
      }
      setModalMessage(`인증 성공, 아이디: ${response?.data}`);
      setShowModal(true);
    } catch (error: any) {
      console.error(error);
      const errMsg =
        error.response?.data || "인증번호 확인 중 오류가 발생했습니다.";
      setModalMessage(errMsg);
      setShowModal(true);
    }
  };

  // 타이머 동작
  useEffect(() => {
    if (timer === null) return;
    if (timer <= 0) {
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

  // 시/분 포맷
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}: ${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="px-4 pb-4">
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
            setFoundId("");
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
            setFoundId("");
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

      {/* 아이디 찾기 결과 표시 */}
      {foundId && (
        <div className="mt-4 text-center text-blue-600">
          <p>아이디: {foundId}</p>
        </div>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
      />
    </div>
  );
}
