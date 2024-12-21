"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/modal/modal";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    verificationCode: "",
  });

  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
  });

  const [terms, setTerms] = useState({
    all: false,
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
    terms5: false,
  });

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

  const handleSingleTerm = (term: string, checked: boolean) => {
    const newTerms = {
      ...terms,
      [term]: checked,
    };

    const allChecked = Object.entries(newTerms)
      .filter(([key]) => key !== "all")
      .every(([_, value]) => value);

    setTerms({
      ...newTerms,
      all: allChecked,
    });
  };

  const handleDuplicateCheck = (type: string) => {
    const value = type === "id" ? formData.id : formData.email;

    if (!value) {
      setModal({
        isOpen: true,
        message: `사용 불가능한 ${type === "id" ? "아이디" : "이메일"}입니다.`,
      });
      return;
    }

    setModal({
      isOpen: true,
      message: `사용 가능한 ${type === "id" ? "아이디" : "이메일"}입니다.`,
    });
  };

  const handleVerificationRequest = () => {
    setShowVerificationInput(true);
    setModal({
      isOpen: true,
      message: "인증번호가 발송되었습니다.",
    });
  };

  const handleVerificationConfirm = () => {
    if (!formData.verificationCode) {
      setModal({
        isOpen: true,
        message: "인증번호가 일치하지 않습니다.",
      });
      return;
    }

    setModal({
      isOpen: true,
      message: "인증이 완료되었습니다.",
    });
  };

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        message={modal.message}
      />
      <div className="mx-auto w-[360px] bg-white">
        <Header title="로그인" />

        <div className="mx-auto w-[360px] rounded-lg bg-white px-4 py-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">
                아이디<span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="id"
                  placeholder="아이디를 입력해주세요"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  required
                />
                <Button
                  variant="outline"
                  className="whitespace-nowrap text-emerald-500 border-emerald-500"
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
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                  className="whitespace-nowrap text-emerald-500 border-emerald-500"
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
                  className="whitespace-nowrap text-emerald-500 border-emerald-500"
                  onClick={handleVerificationRequest}
                  type="button"
                  disabled={!formData.phone}
                >
                  인증번호 받기
                </Button>
              </div>
              {showVerificationInput && (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="인증번호를 입력해주세요"
                    value={formData.verificationCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        verificationCode: e.target.value,
                      })
                    }
                  />
                  <Button
                    variant="outline"
                    className="whitespace-nowrap text-emerald-500 border-emerald-500"
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
                    onCheckedChange={handleAllTerms}
                  />
                  <label
                    htmlFor="terms-all"
                    className="text-sm font-medium leading-none"
                  >
                    전체 동의합니다.
                  </label>
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를
                  이용할 수 있습니다.
                </p>
                {Object.entries(terms).map(([key, value]) => {
                  if (key === "all") return null;
                  const labels = {
                    terms1: "이용약관 동의 (필수)",
                    terms2: "개인정보 이용 동의 (필수)",
                    terms3: "개인정보 이용 동의 (선택)",
                    terms4: "무료배송, 할인 쿠폰 등 혜택/정보 수신 동의 (선택)",
                    terms5: "본인은 만 14세 이상입니다. (필수)",
                  };
                  return (
                    <div key={key} className="flex items-center space-x-2 ml-4">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => {
                          handleSingleTerm(key, checked);
                        }}
                      />
                      <label htmlFor={key} className="text-sm leading-none">
                        {labels[key]}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mt-6">
              가입하기
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}
