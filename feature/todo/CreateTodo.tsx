import { Input } from "@/components/ui/input";
import { useCreateTodoMutation } from "./api/api"; // REST API와 통신하여 Todo 데이터를 생성하는데 사용하는 React Hook
import { FormEventHandler } from "react"; // onsubmit 이벤트 핸들러 타입
import { format } from "date-fns";

// Todo 컴포넌트
export default function CreateTodo() {
  const [create] = useCreateTodoMutation();
  // useCreateTodoMutation은 create라는 함수를 반환하며, 이를 통해 서버에 새로운 Todo를 전송할 수 있습니다.

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); // 폼이 제출될 때 기본 동작(페이지 새로고침)을 막는다.
    const formData = new FormData(event.currentTarget); // FormData는 HTML 폼 데이터를 추출하는 표준 Web API. event.currentTarget은 이벤트가 발생한 폼 엘리먼트를 참조. 키-값 형태로 저장됨.
    const title = formData.get("newTodoTitle") as string; // 폼 데이터에서 입력 필드 이름이 newTodoTitle인 값을 가져옴. 이 값이 문자열임을 명시
    if (!title) return; // 입력 값이 비어있다면, 아무 작업도 하지 않고 함수 실행을 종료

    create({
      // event.currentTarget은 이벤트가 발생한 폼 엘리먼트를 참조합니다.
      newTodo: {
        title, // 사용자 입력 값
        created: format(new Date().toISOString(), "yyyy-MM-dd"), // 생성날짜(현재시간)
        lastModified: format(new Date().toISOString(), "yyyy-MM-dd"), // 마지막 수정 날짜(현재시간)
        status: "not-started",
      },
    });
  };

  return (
    // onSubmit 이벤트 핸들러로 handleSubmit이 연결되어 있음. 사용자가 입력값을 제출하면 handleSubmit이 호출됨.

    <form onSubmit={handleSubmit}>
      <Input className="h-8 text-sm" name="newTodoTitle"></Input>
    </form>
  );
}

// 사용자가 입력 필드에 제목을 입력.
// Submit을 통해 폼 데이터를 전송.
// handleSubmit 함수가 실행되어 입력값을 검증.
// 새로운 Todo 데이터(title, created, lastModified, status)가 create 함수에 의해 서버로 전송.
// 입력값이 유효하지 않으면 아무 작업도 하지 않음.
