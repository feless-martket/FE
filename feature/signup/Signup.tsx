"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/modal/modal";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  signupUser,
  checkEmailDuplicate,
  checkIdDuplicate,
} from "@/feature/signup/authService";

// 폼 유효성 검사 함수
function validateForm(formData: {
  userId: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  phone: string;
}) {
  const errors: { [key: string]: string } = {};

  // 아이디 검증
  if (!formData.userId) {
    errors.id = "아이디를 입력해주세요";
  } else if (formData.userId.length < 4) {
    errors.id = "아이디는 4자 이상이어야 합니다";
  }

  // 비밀번호 검증
  if (!formData.password) {
    errors.password = "비밀번호를 입력해주세요";
  } else if (formData.password.length < 8) {
    errors.password = "비밀번호는 8자 이상이어야 합니다";
  }

  // 비밀번호 확인 검증
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다";
  }

  // 이름 검증
  if (!formData.name) {
    errors.name = "이름을 입력해주세요";
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = "이메일을 입력해주세요";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다";
  }

  // 전화번호 형식 검증
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!formData.phone) {
    errors.phone = "전화번호를 입력해주세요";
  } else if (!phoneRegex.test(formData.phone)) {
    errors.phone = "올바른 전화번호 형식이 아닙니다";
  }

  return errors;
}

// 필수 약관 검증 함수
function validateTerms(terms: { [key: string]: boolean }) {
  const requiredTerms = ["terms1", "terms2", "terms5"];
  return requiredTerms.every((term) => terms[term]);
}

// 회원가입 폼 컴포넌트
export default function SignupForm() {
  // 로딩 상태 추가
  const [isLoading, setIsLoading] = useState(false);
  const [isIdDuplicate, setIsIdDuplicate] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
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

  // const handleDuplicateCheck = async (type: string) => {
  //   const value = type === "id" ? formData.userId : formData.email;

  //   if (!value) {
  //     setModal({
  //       isOpen: true,
  //       message: `${type === "id" ? "아이디" : "이메일"}를 입력해주세요.`,
  //     });
  //     return;
  //   }

  //   // 실제 중복 검사 API 호출 로직 추가 필요
  //   try {
  //     setIsLoading(true);
  //     // API 호출 로직
  //     await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 지연

  //     setModal({
  //       isOpen: true,
  //       message: `사용 가능한 ${type === "id" ? "아이디" : "이메일"}입니다.`,
  //     });
  //   } catch (error) {
  //     setModal({
  //       isOpen: true,
  //       message: `중복 확인 중 오류가 발생했습니다.`,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleVerificationRequest = async () => {
    if (!formData.phone) {
      setModal({
        isOpen: true,
        message: "휴대폰 번호를 입력해주세요.",
      });
      return;
    }

    try {
      setIsLoading(true);
      // 실제 인증번호 발송 API 호출 로직 추가 필요
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 지연

      setShowVerificationInput(true);
      setModal({
        isOpen: true,
        message: "인증번호가 발송되었습니다.",
      });
    } catch (error) {
      setModal({
        isOpen: true,
        message: "인증번호 발송 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationConfirm = async () => {
    if (!formData.verificationCode) {
      setModal({
        isOpen: true,
        message: "인증번호를 입력해주세요.",
      });
      return;
    }

    try {
      setIsLoading(true);
      // 실제 인증번호 확인 API 호출 로직 추가 필요
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 지연

      setModal({
        isOpen: true,
        message: "인증이 완료되었습니다.",
      });
    } catch (error) {
      setModal({
        isOpen: true,
        message: "인증번호가 일치하지 않습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //값 유효성 검사 후 회원가입 API 호출
  const handleSignup = async () => {
    if (isLoading) return;

    try {
      // 폼 유효성 검사
      const formErrors = validateForm(formData);
      if (Object.keys(formErrors).length > 0) {
        setModal({
          isOpen: true,
          message: Object.values(formErrors)[0],
        });
        return;
      }

      // 필수 약관 검증
      if (!validateTerms(terms)) {
        setModal({
          isOpen: true,
          message: "필수 약관에 모두 동의해주세요.",
        });
        return;
      }
      if (isIdDuplicate) {
        setModal({
          isOpen: true,
          message: "중복된 아이디입니다. 다른 아이디를 사용해주세요.",
        });
        return;
      }
      if (isEmailDuplicate) {
        setModal({
          isOpen: true,
          message: "중복된 이메일입니다. 다른 이메일을 사용해주세요.",
        });
        return;
      }

      setIsLoading(true);
      const result = await signupUser({
        userId: formData.userId,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      setModal({
        isOpen: true,
        message: result.message,
      });

      // 성공 시 폼 초기화
      setFormData({
        userId: "",
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
        phone: "",
        verificationCode: "",
      });

      // 약관 동의 초기화
      setTerms({
        all: false,
        terms1: false,
        terms2: false,
        terms3: false,
        terms4: false,
        terms5: false,
      });

      // 인증번호 입력 필드 초기화
      setShowVerificationInput(false);
      setIsIdDuplicate(false);
      setIsEmailDuplicate(false);
    } catch (error: any) {
      console.error("API 호출 중 에러:", error);
      setModal({
        isOpen: true,
        message: error.message || "회원가입 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicateCheck = async (type: string) => {
    const value = type === "id" ? formData.userId : formData.email;

    if (!value) {
      setModal({
        isOpen: true,
        message: `${type === "id" ? "아이디" : "이메일"}를 입력해주세요.`,
      });
      return;
    }

    try {
      setIsLoading(true);

      if (type === "id") {
        const isDuplicate = await checkIdDuplicate(value);
        if (isDuplicate === true) {
          setModal({
            isOpen: true,
            message: "중복된 ID가 있습니다.",
          });
        } else {
          setModal({
            isOpen: true,
            message: "사용 가능한 ID입니다.",
          });
        }
      } else {
        // === 이메일 중복확인 로직 ===
        const isDuplicate = await checkEmailDuplicate(value); // <-- 함수 호출
        if (isDuplicate === true) {
          setIsEmailDuplicate(true);
          setModal({
            isOpen: true,
            message: "중복된 이메일이 있습니다.",
          });
        } else {
          setIsEmailDuplicate(false);
          setModal({
            isOpen: true,
            message: "사용 가능한 이메일입니다.",
          });
        }
      }
    } catch (error) {
      setModal({
        isOpen: true,
        message: `중복 확인 중 오류가 발생했습니다.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        message={modal.message}
      />
      <div className="mx-auto w-[360px] bg-white">
        <Header title="회원가입" />
        <div className="mx-auto w-[360px] rounded-lg bg-white px-4 py-6">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* 아이디 입력 */}
            <div className="space-y-2">
              <Label htmlFor="id">
                아이디<span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="id"
                  placeholder="아이디를 입력해주세요"
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                  required
                />
                <Button
                  variant="outline"
                  className="whitespace-nowrap text-emerald-500 border-emerald-500"
                  onClick={() => handleDuplicateCheck("id")}
                  type="button"
                  disabled={isLoading}
                >
                  중복확인
                </Button>
              </div>
            </div>

            {/* 비밀번호 입력 */}
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

            {/* 비밀번호 확인 */}
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

            {/* 이름 입력 */}
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

            {/* 이메일 입력 */}
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
                  disabled={isLoading}
                >
                  중복확인
                </Button>
              </div>
            </div>

            {/* 휴대폰 번호 입력 */}
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
                  disabled={isLoading || !formData.phone}
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
                    disabled={isLoading}
                  >
                    인증번호 확인
                  </Button>
                </div>
              )}
            </div>

            {/* 약관 동의 */}
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
                          handleSingleTerm(key, checked as boolean);
                        }}
                      />
                      <label htmlFor={key} className="text-sm leading-none">
                        {labels[key as keyof typeof labels]}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 가입하기 버튼 */}
            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mt-6"
              onClick={handleSignup}
              disabled={isLoading}
            >
              가입하기
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}
