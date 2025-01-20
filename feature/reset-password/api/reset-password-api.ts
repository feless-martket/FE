import myApi from "@/lib/axios";

const BASE_PATH = "/users/reset-pw";

export const resetPwApi = {
  /**
   * 비밀번호 재설정 - 인증번호 검증 + 새 비번 설정
   * POST /users/reset-pw/send-code
   * Body : { username, email }
   */

  sendCode: async (username: string, email: string) => {
    const response = await myApi.post(`${BASE_PATH}/send-code`, {
      username,
      email,
    });
    return response.data;
  },

  /**
   * 비밀번호 재설정 - 인증번호 검증
   * POST /users/reset-pw/verify-code
   * Body : { username, email, code }
   */
  verifyCode: async (username: string, email: string, code: string) => {
    const response = await myApi.post(`${BASE_PATH}/verify-code`, {
      username,
      email,
      code,
    });
    return response.data;
  },

  resetPassword: async (
    username: string,
    email: string,
    newPassword: string
  ) => {
    const response = await myApi.post(`${BASE_PATH}/reset-password`, {
      username,
      email,
      newPassword,
    });
    return response.data;
  },
};
