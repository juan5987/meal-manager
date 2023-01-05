export interface IUser {
  id: number;
  age: number;
  height: number;
  sex: '' | 'Homme' | 'Femme';
  username: string;
  email: string;
  activity:
    | 'sédentaire'
    | 'activité légère'
    | 'activité modérée'
    | 'activité intense';
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
  weight: number;
  goal: number;
  date: string;
  user_id: number;
}

export interface IregisterInfo {
  username: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  height: number;
  weight: number;
  goal: number;
  age: number;
  date: string;
  sex: 'Femme' | 'Homme' | '';
  activity:
    | 'sédentaire'
    | 'activité légère'
    | 'activité modérée'
    | 'activité intense'
    | '';
}
