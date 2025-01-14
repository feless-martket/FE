"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * 확인 / 취소 모달
 *
 * @param {boolean} open - 모달의 열림 상태
 * @param {() => void} onClose - 모달을 닫는함수
 * @param {string} title - 모달 제목
 * @param {string} description - 모달 설명
 * @param {string} confirmText - 확인 버튼 텍스트
 * @param {string} cancelText - 취소 버튼 텡스트
 * @param {() => void} onConfirm - 확인 버튼 클릭 핸들러
 */

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

export function CheckedModal({
  open,
  onClose,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <div className="p-6">
          <DialogTitle className="text-center text-lg font-medium">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            {description}
          </DialogDescription>
        </div>
        <div className="flex border-t">
          <button
            className="flex-1 p-4 text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="flex-1 p-4 text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
