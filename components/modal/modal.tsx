"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Modal 컴포넌트
 *
 * {boolean} isOpen - 모달의 열림 상태를 제어
 * {() => void} onClose - 모달을 닫는 함수
 * {string} message - 모달 내부에 표시될 메시지
 *
 * returns {JSX.Element} 모달 UI 컴포넌트를 반환
 */
export function Modal({ isOpen, onClose, message }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* 모달 콘텐츠 영역 */}
      <DialogContent className="w-[320px] h-[150px] p-0 rounded-xl">
        <div className="p-6">
          {/* 메시지 표시 영역 */}
          <p className="text-center mb-4">{message}</p>

          {/* 확인 버튼 */}
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-emerald-500 hover:bg-white hover:text-emerald-600"
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
