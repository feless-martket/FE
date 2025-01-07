/**
 * 백엔드(Spring)에서 로그인 성공 시
 * 반환해주는 JSON 형태 인터페이스
 */

export interface LoginResponseDto {
  username: string;
  accessToken: string;
  refreshToken: string;
  message: string;
}
