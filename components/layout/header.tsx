import Link from "next/link";
import { ReactNode } from "react";
import { X } from "lucide-react";

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
  return (
    <div className={`relative mb-4 ${showDivider ? "pb-4" : ""} ${className}`}>
      <div className="text-center text-lg font-medium ">{title}</div>
      {closeButton || (
        <Link
          href="/"
          className="absolute left-0 top-1 flex size-5 items-center justify-center"
        >
          <X className="size-5" />
        </Link>
      )}
      {showDivider && (
        <div className={`absolute inset-x-0 bottom-0 ${dividerClassName}`} />
      )}
    </div>
  );
}
