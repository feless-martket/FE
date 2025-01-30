"use client";

import myApi from "@/lib/axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserInfo {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface AuthContextType {
  isLoading: boolean;
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
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
        //   console.warn("토큰이 없습니다. 로그인 페이지로 이동합니다.");
        //   router.push("/login");
        //   throw new Error("토큰이 없습니다.");
        // }

        const res = await myApi.get("/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 로컬스토리지에서 가져온 토큰을 헤더에 포함
          },
        });

        // if (!res.ok) {
        //   throw new Error("로그인되지 않았습니다.");
        // }

        // const data = await res.json();
        // console.log("사용자 정보 불러오기 성공:", res.data);

        setUserInfo(res.data);
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

  // 로그아웃 함수 구현
  const logout = async () => {
    console.log("로그아웃 처리 중.");
    try {
      const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
      await myApi.post(
        "/users/logout",
        {}, // POST 요청의 body가 필요 없다면 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 포함
          },
        },
      );
    } catch (error) {
      console.error("로그아웃 API 호출 실패: ", error);
      // API 호출 실패 시에도 로컬 로그아웃 진행
    }
    // 클라이언트 측 토큰 및 인증 상태 초기화
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setUserInfo(null);
    router.push("/landing"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn, userInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
