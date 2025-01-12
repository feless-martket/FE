import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 sm:max-w-[320px]">
        <div className="p-6">
          <p className="text-center text-base">삭제하시겠습니까?</p>
        </div>
        <DialogFooter className="flex border-t p-0">
          <button
            onClick={onClose}
            className="flex-1 border-r p-4 text-sm hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 p-4 text-sm text-green-600 hover:bg-gray-50"
          >
            확인
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
