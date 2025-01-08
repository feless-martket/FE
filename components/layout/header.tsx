"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  showDivider?: boolean;
  dividerClassName?: string;
  closeButton?: ReactNode;
  className?: string;
}

export function Header({
  title,
  showDivider = true,
  dividerClassName = "border-b border-gray-200",
  closeButton,
  className = "",
}: HeaderProps) {
  const router = useRouter();

  return (
    <div className={`relative ${showDivider ? "pb-4" : ""} ${className}`}>
      <div className="flex items-center justify-center ">
        {closeButton || (
          <button
            onClick={() => router.back()}
            className="absolute left-0 flex size-5 h-full items-center justify-center"
          >
            <X size={24} />
          </button>
        )}
        <div className="text-lg font-bold">{title}</div>
      </div>

      {showDivider && (
        <div className={`mt-5 w-full border ${dividerClassName}`}></div>
      )}
    </div>
  );
}
