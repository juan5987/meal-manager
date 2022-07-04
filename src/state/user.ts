export interface IUser {
  id: number;
  name: string;
  email: string;
  age: number;
  actualWeight: number;
  actualGoal: number;
  height: number;
}

export interface IDailyIntake {
  id: number;
  calorie: number;
  proteinPC: number;
  protein: number;
  carbohydratePC: number;
  carbohydrate: number;
  lipidPC: number;
  lipid: number;
  fiber: number;
}

export interface IWeight {
  id: number;
  weight: number;
  goal: number;
  date: string;
  user_id: number;
}
