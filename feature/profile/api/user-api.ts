"use client";

import {
  DeleteMemberRequest,
  DeleteMemberResponse,
} from "@/feature/profile/types/api.type";
import myApi from "@/lib/axios";

/**
 * 논리적 회원탈퇴 API 호출
 * @param token   - 현재 사용자 Access Token
 * @param reqeust - { username }
 * @returns       - { success, message }
 */

export async function deleteMember(
  token: string,
  request: DeleteMemberRequest
): Promise<DeleteMemberResponse> {
  try {
    const res = await myApi.post<DeleteMemberResponse>(
      "/users/delete", // 백엔드 탈퇴 엔드 포인트
      request, // { username }
      {
        headers: {
          Authorization: `Bearer ${token}`, // 액세스 토큰
        },
      }
    );
    return res.data; // { success, message }
  } catch (error: any) {
    throw new Error(error.res?.data || "회원 탈퇴 중 오류가 발생했습니다.");
  }
}
