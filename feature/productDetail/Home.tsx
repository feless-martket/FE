import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <nav className="flex justify-between space-x-15 border-t px-4 py-2 text-sm text-gray-700">
        <a href="" className="hover:text-green-500">
          상품설명
        </a>
        <a href="#" className="hover:text-green-500">
          상세정보
        </a>
        <a href="#" className="hover:text-green-500">
          후기
        </a>
        <a href="#" className="hover:text-green-500">
          문의
        </a>
      </nav>
    </header>
  );
};

export default Header;
