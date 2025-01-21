import { LoginResponseDto } from "@/feature/login/types/api.type";
import myApi from "@/lib/axios";

/**
 * 로그인 API 호출하는 함수
 *
 * @param username - 사용자 아이디
 * @param password - 사용자 비밀번호
 * @returns        - 백엔드가 반환하는 LoginResponseDto
 */

export async function loginApiCall(
  username: string,
  password: string
): Promise<LoginResponseDto> {
  console.log("로그인 API 호출 >>>", { username, password });

  // fetch를 통해 백엔드 /users/login 엔드포인트에 POST
  const res = await myApi.post("/users/login", {
    username,
    password,
  });

  // 응답이 200(OK)이 아닐 경우 에러 처리
  if (res.status !== 200) {
    console.error("로그인 API 에러 >>>", res);
    const errorMsg = await res.data;
    throw new Error(errorMsg);
  }

  // 성공 시 JSON 파싱
  const data: LoginResponseDto = await res.data;
  console.log("로그인 API 성공 >>>", data);

  // 응답 헤더에서 토큰 추출
  // const accessToken = res.headers.get("Authorization")?.replace("Bearer ", "");
  // const refreshToken = res.headers.get("Refresh-Token")?.replace("Bearer ", "");
  const accessTokenHeader = res.headers["authorization"];
  const refreshTokenHeader = res.headers["refresh-token"];

  const accessToken = accessTokenHeader?.replace("Bearer ", "");
  const refreshToken = refreshTokenHeader?.replace("Bearer ", "");

  // 토큰이 존재하면 LocalStorage에 저장(현재는 개발단계니 localStorage저장, 추후에 보안대책 변경 시 수정 예정 아마 HttpOnly Cookie에 저장할 듯함.)
  if (accessToken && refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    console.log("토큰 정보를 헤더에서 추출하지 못했습니다.");
  }

  return data;
}
