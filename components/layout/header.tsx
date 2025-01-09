"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
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

  const goToLanding = () => {
    router.back();
  };
  return (
    <div className={`relative mb-4 ${showDivider ? "pb-4" : ""} ${className}`}>
      <div className="text-center text-lg font-medium ">{title}</div>
      {closeButton || (
        <Link
          href="/"
          className="absolute left-0 top-1 flex size-5 items-center justify-center"
        >
          <X className="size-5" onClick={goToLanding} />
        </Link>
      )}
      {showDivider && (
        <div className={`mt-5 w-full border ${dividerClassName}`}></div>
      )}
    </div>
  );
}
