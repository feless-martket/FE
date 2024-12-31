export interface SignupData {
  userId: string;
  password: string;
  name: string;
  email: string;
  phone: string;
}

export async function signupUser(
  data: SignupData
): Promise<{ message: string }> {
  try {
    console.log("서버로 보낼 데이터:", data);
    const response = await fetch("http://localhost:8080/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "회원가입에 실패했습니다.");
    }

    const result = await response.json();
    console.log("서버 응답 데이터:", result);

    return { message: "회원가입이 완료되었습니다!" };
  } catch (error: any) {
    throw new Error(error.message || "서버에 문제가 발생했습니다.");
  }
}

export async function checkEmailDuplicate(email: string): Promise<boolean> {
  try {
    console.log(email);
    const response = await fetch(
      `http://localhost:8080/users/email?e=${email}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("이메일 중복 확인 요청 중 오류가 발생했습니다.");
    }

    const isDuplicate = await response.json(); // true 또는 false 라고 가정
    return isDuplicate;
  } catch (error: any) {
    throw new Error(error.message || "서버에 문제가 발생했습니다.");
  }
}

export async function checkIdDuplicate(userId: string): Promise<boolean> {
  try {
    console.log(userId);
    const response = await fetch(
      `http://localhost:8080/users/id?id=${userId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Id 중복 확인 요청 중 오류가 발생했습니다.");
    }

    const isDuplicate = await response.json(); // true 또는 false 라고 가정
    return isDuplicate;
  } catch (error: any) {
    throw new Error(error.message || "서버에 문제가 발생했습니다.");
  }
}
