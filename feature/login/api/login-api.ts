import { LoginResponseDto } from "@/feature/login/types/api.type";

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
  const res = await fetch("http://localhost:8080/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  // 응답이 200(OK)이 아닐 경우 에러 처리
  if (!res.ok) {
    console.error("로그인 API 에러 >>>", res);
    const errorMsg = await res.text();
    throw new Error(errorMsg);
  }

  // 성공 시 JSON 파싱
  const data: LoginResponseDto = await res.json();
  console.log("로그인 API 성공 >>>", data);

  return data;
}
