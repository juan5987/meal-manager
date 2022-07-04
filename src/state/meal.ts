export interface IIngredient {
  id: number;
  name: string;
  quantity: number;
  calorie: number;
  protein: number;
  carbohydrate: number;
  lipid: number;
  fiber: number;
}

export interface IMeal {
  id: number;
  name: string;
  calorie: number;
  protein: number;
  carbohydrate: number;
  lipid: number;
  fiber: number;
  ingredients: [IIngredient];
}

export interface INutrition {
  calorie: number;
  protein: number;
  lipid: number;
  carbohydrate: number;
  fiber: number;
}
