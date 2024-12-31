export interface Product {
  product_id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  imgurl: string;
  product_status: string | null;
}

export async function searchProducts(keyword: string): Promise<Product[]> {
  try {
    console.log("🔍 검색 API 호출:", keyword);
    const response = await fetch(
      `http://localhost:8080/search?keyword=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("검색 API 호출 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ 검색 오류:", error);
    throw error;
  }
}

export async function getSuggestions(keyword: string): Promise<string[]> {
  try {
    console.log("🔄 자동완성 API 호출:", keyword);
    const response = await fetch(
      `http://localhost:8080/search/suggestions?keyword=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("자동완성 API 호출 실패");
    }

    const suggestions: string[] = await response.json();
    console.log("✅ 자동완성 결과:", suggestions);
    return suggestions;
  } catch (error) {
    console.error("❌ 자동완성 오류:", error);
    throw error;
  }
}
