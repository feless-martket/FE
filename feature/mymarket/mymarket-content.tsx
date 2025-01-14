"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { SecondModal } from "@/components/modal/secondmodal";

interface MenuItem {
  id: string;
  name: string;
  value?: string;
  link: string;
}

const menuItems: MenuItem[] = [
  { id: "points", name: "적립금", value: "96원", link: "/points" },
  { id: "coupons", name: "쿠폰", value: "0장", link: "/coupons" },
  { id: "loan", name: "친구초대", value: "지금 5,000원 받기", link: "/invite" },
  { id: "orderHistory", name: "주문내역", link: "/orders" },
  { id: "shipping", name: "선물내역", link: "/gifts" },
  { id: "regular", name: "자주 사는 상품", link: "/frequent" },
  { id: "liked", name: "찜한 상품", value: "5개", link: "/liked" },
  { id: "reviews", name: "상품후기", link: "/reviews" },
  { id: "refunds", name: "결제수단", link: "/payment" },
  { id: "address", name: "배송지 관리", link: "/address" },
  { id: "profile", name: "개인 정보 수정", link: "/profile" },
  { id: "inquiry", name: "상품 문의", link: "/inquiry" },
  { id: "oneToOne", name: "1:1 문의", link: "/support" },
  { id: "notice", name: "공지사항", link: "/notice" },
  { id: "faq", name: "자주하는 질문", link: "/faq" },
  { id: "settings", name: "앱 설정", link: "/settings" },
  { id: "logout", name: "로그아웃", link: "/logout" },
];

interface MyMarketContentProps {
  userInfo: {
    username: string;
  } | null;
}

export function MyMarketContent({ userInfo }: MyMarketContentProps) {
  const { logout } = useAuth(); // useAuth에서 logout 함수 가져오기
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="pb-16">
      <div className="px-4 pb-4 pt-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-[38px] w-[52px] items-center justify-center rounded-lg border-2 border-emerald-500 bg-white text-sm text-emerald-500">
            일반
          </div>
          <div className="text-base font-bold">
            {userInfo?.username || "사용자"}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="h-12 flex-1 rounded-lg bg-gray-50 text-sm">
            전체 등급 보기
          </button>
          <button className="h-12 flex-1 rounded-lg bg-gray-50 text-sm">
            다음 등급 혜택 보기
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {menuItems.map((item) => {
          if (item.id === "logout") {
            // 로그아웃 항목은 버튼으로 처리
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogoutModal(true); // 모달 열기
                }}
                className="flex items-center justify-between border-b border-gray-100 px-4 py-[14px] text-red-500"
              >
                <span>{item.name}</span>
                <div className="flex items-center">
                  {/* 로그아웃 아이콘은 생략 */}
                </div>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.link}
              className={`flex items-center justify-between border-b border-gray-100 px-4 py-[14px] ${
                item.id === "logout" ? "text-red-500" : "text-gray-900"
              }`}
            >
              <span>{item.name}</span>
              <div className="flex items-center">
                {item.value && (
                  <span className="mr-1 text-emerald-500">{item.value}</span>
                )}
                {item.id !== "logout" && (
                  <ChevronRight className="size-5 text-gray-300" />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <SecondModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="정말 로그아웃 하시겠어요?"
        description=""
        confirmText="로그아웃"
        cancelText="취소"
        onConfirm={() => {
          setShowLogoutModal(false);
          logout();
        }}
      />
    </div>
  );
}
