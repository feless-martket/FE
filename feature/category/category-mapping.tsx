export const categoryMapping: Record<string, string> = {
  // VEGETABLE
  "고구마·감자·당근": "ROOT_VEGETABLE",
  "시금치·쌈채소·나물": "LEAF_VEGETABLE",
  "브로콜리·파프리카·양배추": "SALAD_VEGETABLE",
  "양파·대파·마늘·배추": "ONION_VEGETABLE",
  "오이·호박·고추": "GREEN_VEGETABLE",
  // FRUIT
  "사과·배": "APPLE_PEAR",
  감귤류: "CITRUS",
  견과류: "NUTS",
  "쌀·잡곡": "RICES",

  //SEAFOOD
  생선류: "FISH",
  "오징어·낙지·문어": "INVERTEBRATE",
  "멸치·황태·다시팩": "DRIED_FISH",
  조개류: "SHELLFISH",
};

export const mainCategoryMapping: Record<string, string> = {
  채소: "VEGETABLE",
  "과일·견과·쌀": "FRUIT",
  "수산·해산·건어물": "SEAFOOD",
};
