"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import myApi from "@/lib/axios";

interface Option {
  value: string;
  label: string;
}

const categories: Option[] = [
  { value: "meat", label: "고기" },
  { value: "vegetables", label: "야채" },
];

const meatSubCategories: Option[] = [
  { value: "pork", label: "돼지고기" },
  { value: "beef", label: "electronicDevices" },
];

const vegetableSubCategories: Option[] = [
  { value: "CUCUMBER", label: "오이" },
  { value: "LETTUCE", label: "상추" },
  { value: "CARROT", label: "당근" },
];
const quantities: Option[] = Array.from({ length: 100 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

export default function ProductForm() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64Image = await convertToBase64(file); // Base64로 변환
      setSelectedImage(base64Image); // 상태에 Base64 값 저장
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string); // Base64 문자열로 반환
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // 파일을 Base64로 변환
    });
  };

  const handleImageClick = () => {
    document.getElementById("imageInput")?.click();
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 상품명과 상품설명 추가
    const productName = (e.target as HTMLFormElement).elements.namedItem(
      "productName",
    ) as HTMLInputElement;
    const productDescription = (e.target as HTMLFormElement).elements.namedItem(
      "productDescription",
    ) as HTMLInputElement;
    const productPrice = (e.target as HTMLFormElement).elements.namedItem(
      "productPrice",
    ) as HTMLInputElement;

    const formData = {
      name: productName.value,
      description: productDescription.value,
      price: productPrice.value,
      quantity: selectedQuantity,
      category: selectedSubCategory,
      // 이미지 파일을 Base64로 인코딩하여 전송 (파일 크기가 크지 않은 경우)
      image: selectedImage,
    };

    try {
      // 상품 등록 API 호출
      const response = await myApi.post("/product/save", formData, {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 보내기
        },
      });

      console.log("서버 응답:", response.data);
      alert("상품이 등록되었습니다.");
    } catch (error) {
      console.error("오류 발생:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4 py-2">
      <div className="flex justify-center">
        <h1 className="text-2xl">상품등록</h1>
      </div>

      <div>
        <h2>카테고리</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* 카테고리 선택 */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory(""); // 카테고리 변경 시 서브카테고리 초기화
            }}
            className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-8 text-sm text-gray-800"
          >
            <option value="" className="text-gray-400">
              카테고리를 선택해주세요
            </option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
        </div>

        {/* 서브카테고리 선택 */}
        <div className="relative">
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-8"
            disabled={!selectedCategory} // 카테고리가 선택되지 않으면 서브카테고리 비활성화
          >
            <option value="">분류2</option>
            {/* 선택된 카테고리에 맞는 서브카테고리 표시 */}
            {selectedCategory === "meat"
              ? meatSubCategories.map((subCategory) => (
                  <option key={subCategory.value} value={subCategory.value}>
                    {subCategory.label}
                  </option>
                ))
              : selectedCategory === "vegetables"
                ? vegetableSubCategories.map((subCategory) => (
                    <option key={subCategory.value} value={subCategory.value}>
                      {subCategory.label}
                    </option>
                  ))
                : null}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div>
        <h2>상품명</h2>
      </div>
      <div>
        <input
          type="text"
          name="productName"
          placeholder="상품명을 입력해 주세요."
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <h2>상품설명</h2>
      </div>
      <div>
        <input
          type="text"
          name="productDescription"
          placeholder="상품을 설명해 주세요."
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      <div>
        <h2>가격</h2>
      </div>
      <div>
        <input
          type="text"
          name="productPrice" // 상품 가격 입력 필드 추가
          placeholder="₩"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <h2>수량</h2>
      </div>
      <div className="relative">
        <select
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(e.target.value)}
          className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-8"
        >
          <option value="">수량</option>
          {quantities.map((quantity) => (
            <option key={quantity.value} value={quantity.value}>
              {quantity.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
      </div>

      <div>
        <h2>이미지</h2>
      </div>
      <div className="px-4 py-2">
        <div
          onClick={handleImageClick}
          className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-gray-500"
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="선택된 이미지"
              className="size-full object-cover"
            />
          ) : (
            "이미지를 첨부해 주세요."
          )}
        </div>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-emerald-500 py-3 font-medium text-white hover:bg-emerald-600"
      >
        상품등록
      </button>
    </form>
  );
}
