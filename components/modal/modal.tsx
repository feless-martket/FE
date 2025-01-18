"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean; // 모달 열림 상태
  onClose: () => void; // 모달 닫기 함수
  message: string; // 모달에 표시할 메시지
  onConfirm?: () => void; // 확인 버튼 클릭 시 호출되는 함수
}

/**
 * Modal 컴포넌트
 *
 * {boolean} isOpen - 모달의 열림 상태를 제어
 * {() => void} onClose - 모달을 닫는 함수
 * {string} message - 모달 내부에 표시될 메시지
 *
 * returns {JSX.Element} 모달 UI 컴포넌트를 반환
 */
export function Modal({ isOpen, onClose, message, onConfirm }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[300px] h-[140px] p-0 rounded-xl shadow-lg">
        <div className="p-4 flex flex-col justify-between h-full">
          <p className="text-center text-base	 text-gray-800">{message}</p>
          <div className="flex justify-center items-center mt-4">
            <button
              className="w-full text-emerald-500 hover:bg-white hover:text-emerald-600"
              onClick={() => {
                if (onConfirm) onConfirm();
                onClose();
              }}
            >
              확인
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
