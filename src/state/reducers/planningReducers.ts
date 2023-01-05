import moment from 'moment';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { IIngredient, INutrition } from '../meal';

export interface PlanningState {
  loading: boolean;
  date: string;
  breakfast: Array<IIngredient> | [];
  lunch: Array<IIngredient> | [];
  diner: Array<IIngredient> | [];
  snack: Array<IIngredient> | [];
  nutrition: {
    total: INutrition;
    breakfast: INutrition;
    lunch: INutrition;
    diner: INutrition;
    snack: INutrition;
  };
}

const initialState: PlanningState = {
  loading: false,
  date: moment().format('yyyy-MM-DD'),
  breakfast: [],
  lunch: [],
  diner: [],
  snack: [],
  nutrition: {
    total: {
      calorie: 0,
      protein: 0,
      carbohydrate: 0,
      lipid: 0,
      fiber: 0,
    },
    breakfast: {
      calorie: 0,
      protein: 0,
      carbohydrate: 0,
      lipid: 0,
      fiber: 0,
    },
    lunch: {
      calorie: 0,
      protein: 0,
      carbohydrate: 0,
      lipid: 0,
      fiber: 0,
    },
    diner: {
      calorie: 0,
      protein: 0,
      carbohydrate: 0,
      lipid: 0,
      fiber: 0,
    },
    snack: {
      calorie: 0,
      protein: 0,
      carbohydrate: 0,
      lipid: 0,
      fiber: 0,
    },
  },
};

const reducer = (
  state: PlanningState = initialState,
  action: Action
): PlanningState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
