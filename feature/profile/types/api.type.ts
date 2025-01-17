// 요청 DTO
export interface DeleteMemberRequest {
  username: string;
}

// 응답 DTO
export interface DeleteMemberResponse {
  success: boolean;
  message: string;
}
