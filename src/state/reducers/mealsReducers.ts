import { ActionType } from '../action-types';
import { Action } from '../actions';
import { IMeal, IIngredient } from '../meal';

export interface MealsState {
  loading: boolean;
  userMeals: [IMeal] | [];
  ingredients: [IIngredient] | [];
}

const initialState: MealsState = {
  loading: false,
  userMeals: [],
  ingredients: [],
};

const reducer = (
  state: MealsState = initialState,
  action: Action
): MealsState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
