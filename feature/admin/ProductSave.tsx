"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import myApi from "@/lib/axios";

interface Option {
  value: string;
  label: string;
}

const categories: Option[] = [
  { value: "VEGETABLE", label: "채소" },
  { value: "FRUIT", label: "과일,견과,쌀" },
  { value: "SEAFOOD", label: "수산,해산,건어물" },
];

const discountstatus: Option[] = [
  { value: "WEEKEND_SPECIAL", label: "주말특가" },
  { value: "FINAL_SALE", label: "마감세일" },
];

const fruitSubCategories: Option[] = [
  { value: "APPLE_PEAR", label: "사과·배" },
  { value: "CITRUS", label: "감귤류" },
];

const vegetableSubCategories: Option[] = [
  { value: "ROOT_VEGETABLE", label: "고구마·감자·당근" },
  { value: "LEAF_VEGETABLE", label: "시금치·쌈채소·나물" },
  { value: "GREEN_VEGETABLE", label: "오이·호박·고추" },
];

const productStatuses: Option[] = [
  { value: "AVAILABLE", label: "판매 가능" },
  { value: "UNAVAILABLE", label: "판매 불가능" },
];

const deliveries: Option[] = [
  { value: "GENERAL_DELIVERY", label: "일반배송" },
  { value: "EARLY_DELIVERY", label: "새벽배송" },
  { value: "SELLER_DELIVERY", label: "판매자배송" },
];

const seafoodSubCategories: Option[] = [
  { value: "FISH", label: "생선류" },
  { value: "SHELLFISH", label: "조개류" },
];

const quantities: Option[] = Array.from({ length: 100 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

export default function ProductForm() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");
  const [discount, setdiscount] = useState<string>("");
  const [discountstatuses, setdiscountstatus] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null); // 폼 리셋을 위해 ref 사용
  const [productStatus, setProductStatus] = useState<string>("");
  const [delivery, setdelivery] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productName = (e.target as HTMLFormElement).elements.namedItem(
      "productName",
    ) as HTMLInputElement;
    const productDescription = (e.target as HTMLFormElement).elements.namedItem(
      "productDescription",
    ) as HTMLInputElement;
    const productPrice = (e.target as HTMLFormElement).elements.namedItem(
      "productPrice",
    ) as HTMLInputElement;

    const formData = new FormData();
    formData.append("name", productName.value);
    formData.append("description", productDescription.value);
    formData.append("price", productPrice.value);
    formData.append("quantity", selectedQuantity);
    formData.append("discount", discount);
    formData.append("discountstatus", discountstatuses);
    formData.append("mainCategory", selectedCategory);
    formData.append("subCategory", selectedSubCategory);
    formData.append("productStatus", productStatus);
    formData.append("delivery", delivery);

    selectedImages.forEach((image) => {
      formData.append("imgURL", image);
    });

    try {
      const response = await myApi.post("/admin/saveProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("서버 응답:", response.data);
      alert("상품이 등록되었습니다.");

      // 값 초기화
      formRef.current?.reset(); // 폼 필드 초기화
      setSelectedCategory("");
      setSelectedSubCategory("");
      setSelectedQuantity("");
      setSelectedImages([]);
      setProductStatus("");
      setdelivery("");
    } catch (error) {
      console.error("오류 발생:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 px-4 py-2">
      <div className="flex justify-center">
        <h1 className="text-2xl">상품등록</h1>
      </div>

      <div>
        <h2>카테고리</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory("");
            }}
            className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-8 text-sm text-gray-800"
          >
            <option value="">분류1</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative">
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-8"
            disabled={!selectedCategory}
          >
            <option value="">분류2</option>
            {selectedCategory === "FRUIT"
              ? fruitSubCategories.map((subCategory) => (
                  <option key={subCategory.value} value={subCategory.value}>
                    {subCategory.label}
                  </option>
                ))
              : selectedCategory === "VEGETABLE"
                ? vegetableSubCategories.map((subCategory) => (
                    <option key={subCategory.value} value={subCategory.value}>
                      {subCategory.label}
                    </option>
                  ))
                : selectedCategory === "SEAFOOD"
                  ? seafoodSubCategories.map((subCategory) => (
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
          name="productPrice"
          placeholder="₩"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <h2>할인률</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <select
            value={discountstatuses}
            onChange={(e) => {
              setdiscountstatus(e.target.value);
            }}
            className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-8 text-sm text-gray-800"
          >
            <option value="">분류1</option>
            {discountstatus.map((discount) => (
              <option key={discount.value} value={discount.value}>
                {discount.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative">
          <select
            value={discount}
            onChange={(e) => setdiscount(e.target.value)}
            className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-8"
          >
            <option value="">할인률</option>
            {quantities.map((quantity) => (
              <option key={quantity.value} value={quantity.value}>
                {quantity.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
        </div>
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
        <h2>상품 상태</h2>
      </div>
      <div className="relative">
        <select
          value={productStatus}
          onChange={(e) => setProductStatus(e.target.value)}
          className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-8"
        >
          <option value="">상품 상태 선택</option>
          {productStatuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
      </div>

      <div>
        <h2>배송</h2>
      </div>
      <div className="relative">
        <select
          value={delivery}
          onChange={(e) => setdelivery(e.target.value)}
          className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-8"
        >
          <option value="">배송 옵션 선택</option>
          {deliveries.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
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
          onClick={() => document.getElementById("imageInput")?.click()}
          className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-gray-500"
        >
          {selectedImages.length > 0
            ? selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`선택된 이미지 ${index + 1}`}
                  className="mr-2 size-24 object-cover"
                />
              ))
            : "이미지를 첨부해 주세요."}
        </div>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          multiple
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-emerald-500 py-3 font-medium text-white hover:bg-emerald-600"
      >
        상품등록
      </button>
      <div className="h-16"></div>
    </form>
  );
}
