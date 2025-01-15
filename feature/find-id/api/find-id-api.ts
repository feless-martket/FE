import myApi from "@/lib/axios";

const BASE_PATH = "/users/find-id";

/**
 * [아이디 찾기] API 모듈
 */

export const findIdApi = {
  /**
   * 이메일 인증번호 발송
   * @Param name 사용자 이름
   * @Param email 사용자 이메일
   * @returns Promise (성공 시 메세지를 문자열로 반환)
   */
  sendEmailCode: (name: string, email: string) => {
    // 예) POST /users/find-id/send-code?name=xxx&email=xxx
    return myApi.post(`${BASE_PATH}/send-code?name=${name}&email=${email}`);
  },

  /**
   * 이메일 인증번호 검증
   * @Param name 사용자 이름
   * @Param email 사용자 이메일
   * @Param code 인증번호
   * returns Promise (성공 시 아이디를 문자열로 반환)
   */
  verifyEmailCode: (name: string, email: string, code: string) => {
    return myApi.post(
      // 예) POST /users/find-id/verify-code?name=xxx&email=xxx&code=xxx
      `${BASE_PATH}/verify-code?name=${name}&email=${email}&code=${code}`
    );
  },
};
