// filter-mapping.ts
export const filterMapping: Record<
  string,
  { param: string; value: string | number }
> = {
  // 예: "VEGETABLE" 체크박스가 선택되면 mainCategory=VEGETABLE
  채소: { param: "mainCategory", value: "VEGETABLE" },
  "과일·견과·쌀": { param: "mainCategory", value: "FRUIT" },
  "수산·해산·건어물": { param: "mainCategory", value: "SEAFOOD" },

  // 예: "FRUIT" 체크박스가 선택되면 subCategory=FRUIT
  "고구마·감자·당근": { param: "subCategory", value: "ROOT_VEGETABLE" },
  "시금치·쌈채소·나물": { param: "subCategory", value: "LEAF_VEGETABLE" },
  "오이·호박·고추": { param: "subCategory", value: "GREEN_VEGETABLE" },
  "사과·배": { param: "subCategory", value: "APPLE_PEAR" },
  감귤류: { param: "subCategory", value: "CITRUS" },
  생선류: { param: "subCategory", value: "FISH" },
  조개류: { param: "subCategory", value: "SHELLFISH" },

  // 예: "무료배송" 체크박스가 선택되면 delivery=FREE
  일반배송: { param: "delivery", value: "GENERAL_DELIVERY" },
  새벽배송: { param: "delivery", value: "EARLY_DELIVERY" },
  판매자직접배송: { param: "delivery", value: "SELLER_DELIVERY" },
};
