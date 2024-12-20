"use client"; // 컴포넌트 클라이언트에서 렌더링하도록 지정

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// import { X } from "lucide-react";
import { Modal } from "@/components/modal/modal";

export default function SignupForm() {
  // formdata: 회원가입 폼에 입력된 데이터 관리
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    verificationCode: "",
  });
  // showVerificationInput: 사용자가 인증번호를 요청했는지 여부 관리. true면 인증번호 입력 필드 표시, false는 숨김.
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  // modal: 모달의 상태 관리. isopen은 모달이 열려있는지 여부, message는 모달에 표시할 메시지
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "success" as "success" | "error",
  });
  // terms: 이용약관 동의 상태 관리. all은 전체 동의 여부. 숫자는 개별 동의 항목
  const [terms, setTerms] = useState({
    all: false,
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
    terms5: false,
  });

  // '전체 동의' 체크박스가 변경되었을 떄 호출됨.
  const handleAllTerms = (checked: boolean) => {
    setTerms({
      all: checked,
      terms1: checked,
      terms2: checked,
      terms3: checked,
      terms4: checked,
      terms5: checked,
    });
  };

  // 개별 약관 항목이 변경되었을 떄 호툴됨.
  const handleSingleTerm = (term: keyof typeof terms, checked: boolean) => {
    const newTerms = {
      ...terms,
      [term]: checked,
    };

    // 모든 개별항목이 true면 전체동의를 자동으로 체크.
    const allChecked = Object.entries(newTerms)
      .filter(([key]) => key !== "all")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .every(([_, value]) => value);

    setTerms({
      ...newTerms,
      all: allChecked,
    });
  };

  // handleDuplicateCheck: 중복 확인 버튼 클릭 시 호출됨. 성공 메세지를 modal 상태에 저장하고 모달 열기.
  const handleDuplicateCheck = (type: "id" | "email") => {
    // Simulating API call
    const isAvailable = Math.random() > 0.5;
    setModal({
      isOpen: true,
      message: isAvailable
        ? `사용 가능한 ${type === "id" ? "아이디" : "이메일"}입니다.`
        : `사용 불가능한 ${type === "id" ? "아이디" : "이메일"}입니다.`,
      type: isAvailable ? "success" : "error",
    });
  };

  // handleVerificationRequest: 인증번호 요청. '인증번호 받기' 버튼 클릭 시 호출됨. true로 설정하여 인증번호 입력 필드 표시.
  const handleVerificationRequest = () => {
    setShowVerificationInput(true);
    setModal({
      isOpen: true,
      message: "인증번호가 발송되었습니다.",
      type: "success",
    });
  };

  const handleVerificationConfirm = () => {
    // Simulating verification process
    const isVerified = Math.random() > 0.5;
    setModal({
      isOpen: true,
      message: isVerified
        ? "인증이 완료되었습니다."
        : "인증번호가 일치하지 않습니다.",
      type: isVerified ? "success" : "error",
    });
  };
  // Lable: 필드에 이름을 붙임. htmlFor="id"는 해당 Label이 어떤 Input과 연결되는지 정의.
  // 필수 항목은 *로 표시
  // Input: value 속성으로 상태(formData.id)와 동기화. onChange 이벤트에서 setFormData로 입력값을 업데이트.
  // 비밀번호: **type="password"**를 사용하여 입력값 가리기
  // 이메일: *type="email"**으로 이메일 형식을 자동 검증

  // 모달 컴포넌트
  // isOpen: modal.isOpen 값에 따라 모달이 열림.
  // onClose: 모달을 닫는 함수.
  //message: 모달에 표시할 메시지(modal.message).

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        message={modal.message}
        type={modal.type}
      />

      {/* <header className="flex items-center justify-between p-4 border-b">
        <X className="w-6 h-6" />
        <h1 className="text-lg font-medium">회원가입</h1>
        <div className="w-6" />
      </header> */}

      <form className="space-y-4 p-4">
        <div className="space-y-2">
          <Label htmlFor="id">
            아이디<span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="id"
              placeholder="아이디를 입력해주세요"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              required
            />
            <Button
              variant="outline"
              className="whitespace-nowrap border-emerald-500 text-emerald-500"
              onClick={() => handleDuplicateCheck("id")}
              type="button"
            >
              중복확인
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            비밀번호<span className="text-red-500">*</span>
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            비밀번호 확인<span className="text-red-500">*</span>
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">
            이름<span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="이름을 입력해주세요"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            이메일<span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="예: marketpaaa@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Button
              variant="outline"
              className="whitespace-nowrap border-emerald-500 text-emerald-500"
              onClick={() => handleDuplicateCheck("email")}
              type="button"
            >
              중복확인
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            휴대폰<span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="phone"
              placeholder="숫자만 입력해주세요"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
            <Button
              variant="outline"
              className="whitespace-nowrap border-emerald-500 text-emerald-500"
              onClick={handleVerificationRequest}
              type="button"
              disabled={!formData.phone}
            >
              인증번호 받기
            </Button>
          </div>
          {showVerificationInput && (
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="인증번호를 입력해주세요"
                value={formData.verificationCode}
                onChange={(e) =>
                  setFormData({ ...formData, verificationCode: e.target.value })
                }
              />
              <Button
                variant="outline"
                className="whitespace-nowrap border-emerald-500 text-emerald-500"
                type="button"
                onClick={handleVerificationConfirm}
              >
                인증번호 확인
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2 pt-4">
          <h2 className="text-sm font-medium">
            이용약관동의<span className="text-red-500">*</span>
          </h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms-all"
                checked={terms.all}
                onCheckedChange={(checked) =>
                  handleAllTerms(checked as boolean)
                }
              />
              <label
                htmlFor="terms-all"
                className="text-sm font-medium leading-none"
              >
                전체 동의합니다.
              </label>
            </div>
            <p className="ml-6 text-xs text-gray-500">
              선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를
              이용할 수 있습니다.
            </p>
            {Object.entries(terms).map(([key, value]) => {
              if (key === "all") return null;
              const labels: Record<string, string> = {
                terms1: "이용약관 동의 (필수)",
                terms2: "개인정보 이용 동의 (필수)",
                terms3: "개인정보 이용 동의 (선택)",
                terms4: "무료배송, 할인 쿠폰 등 혜택/정보 수신 동의 (선택)",
                terms5: "본인은 만 14세 이상입니다. (필수)",
              };
              return (
                <div key={key} className="ml-4 flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) =>
                      handleSingleTerm(
                        key as keyof typeof terms,
                        checked as boolean
                      )
                    }
                  />
                  <label htmlFor={key} className="text-sm leading-none">
                    {labels[key]}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <Button className="mt-6 w-full bg-emerald-500 text-white hover:bg-emerald-600">
          가입하기
        </Button>
      </form>

      {/* <nav className="fixed bottom-0 inset-x-0 border-t bg-white">
        <div className="flex justify-around p-3">
          <Home className="w-6 h-6" />
          <Menu className="w-6 h-6" />
          <Search className="w-6 h-6" />
          <User className="w-6 h-6 text-emerald-500" />
        </div>
      </nav> */}
    </>
  );
}
// className
// w-full: 버튼이 전체 너비를 차지.
// bg-emerald-500: 기본 배경색.
// hover:bg-emerald-600: 호버 시 배경색 변경.
// text-white: 텍스트 색상 흰색.
