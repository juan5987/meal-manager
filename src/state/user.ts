export interface IUser {
  id: number;
  age: number;
  height: number;
  sex: string;
  username: string;
  email: string;
  activity: string;
  token: string;
}

export interface IDailyIntake {
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
