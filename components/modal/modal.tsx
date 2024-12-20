"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// ModalProps: 이 인터페이스는 Modal 컴포넌트에 전달되는 프롭(props)의 타입을 정의.
// isOpen (boolean): 모달이 열려 있는 상태인지 여부를 나타냅니다.
// onClose (() => void): 모달을 닫는 동작을 수행하는 함수입니다.
// message (string): 모달 안에 표시될 메시지입니다.
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: "success" | "error";
}

export function Modal({ isOpen, onClose, message, type }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[300px] p-0">
        <div className="p-6">
          <p
            className={`text-center mb-4 ${type === "success" ? "text-emerald-500" : "text-red-500"}`}
          >
            {message}
          </p>
          <Button
            onClick={onClose}
            className={`w-full ${type === "success" ? "text-emerald-500" : "text-red-500"} bg-white hover:bg-white`}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Dialog: 모달의 외부 레이아웃을 관리하는 컴포넌트.
   Props 설명:
    open={isOpen}: 모달이 열려 있는지 여부를 isOpen 상태로 제어. true: 모달이 열림. false: 모달이 닫힘.
    onOpenChange={() => onClose()}: 모달의 열림/닫힘 상태가 변경될 때 호출되는 핸들러. 사용자가 모달을 닫으려고 하면 onClose() 함수가 호출됨.
   DialogContent: 모달의 콘텐츠 영역을 정의.
   Props 설명:
    className="p-0 sm:max-w-[300px]": TailwindCSS 클래스를 사용하여 모달의 스타일을 정의합니다.
        p-0: 내부 패딩을 제거합니다.
        sm:max-w-[300px]: 작은 화면에서 모달의 최대 너비를 300px로 제한합니다.

   {message}: 모달의 메시지 영역. 부모 컴포넌트에서 전달받은 메시지를 화면에 표시합니다.
    TailwindCSS 클래스: mb-4: 아래쪽에 1rem(16px) 간격 추가. text-center: 텍스트를 가운데 정렬.
 */
