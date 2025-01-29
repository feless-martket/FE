import axios from "axios";

if (!process.env.NEXT_PUBLIC_SERVER_BASE_URL) {
  throw new Error("NEXT_PUBLIC_SERVER_BASE_URL이 설정되지 않았습니다.");
}

export const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const myApi = axios.create({
  baseURL,
  withCredentials: true, // Include cookies if needed
  headers: {
    "Content-Type": "application/json", // Optional, set default headers
  },
});

// axios.ts 파일 내에서 myApi 설정 이후에 추가
myApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 응답 감지 시 처리
      console.warn("인증 실패 또는 토큰 만료. 사용자 로그아웃 처리.");

      // 로컬 스토리지에서 토큰 삭제
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // 필요하다면 AuthContext 갱신 로직 실행 (예: 상태 업데이트)

      // 로그인 페이지로 리다이렉트
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default myApi;
