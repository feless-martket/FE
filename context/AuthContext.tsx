"use client";

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserInfo {
  username: string;
  // 추후에 필드 추가 예정
}

interface AuthContextType {
  isLoading: boolean;
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  setIsLoggedIn: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        console.log("사용자 인증 상태 확인 중");

        // LocalStorage에서 토큰 가져오기
        const token = localStorage.getItem("accessToken");

        // 토큰이 없으면 로그인 페이지로 리다이렉트
        // if (!token) {
        //   throw new Error("토큰이 없습니다.");
        // }
        if (!token) {
          setIsLoggedIn(false);
          setIsLoading(false);
          router.push("/login");
          return;
        }

        const res = await fetch("http://localhost:8080/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 로컬스토리지에서 가져온 토큰을 헤더에 포함
          },
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            setIsLoggedIn(false);
            router.push("/login");
            return;
          }
          throw new Error("서버 오류 발생");
        }

        const data = await res.json();
        console.log("사용자 정보 불러오기 성공:", data);

        setUserInfo(data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("인증 확인 실패:", error);
      } finally {
        setIsLoading(false);
        console.log("인증 상태 확인 완료.");
      }
    }

    checkAuth();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ isLoading, isLoggedIn, userInfo, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
