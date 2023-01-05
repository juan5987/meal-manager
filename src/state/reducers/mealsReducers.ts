import { ActionType } from '../action-types';
import { Action } from '../actions';
import { IMeal, IIngredient } from '../meal';

export interface MealsState {
  loading: boolean;
  userMeals: IMeal[] | [];
  ingredients: IIngredient[] | [];
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
    case ActionType.GET_MEALS_SUCCESS:
      return {
        ...state,
        loading: false,
        userMeals: action.payload,
      };

    case ActionType.GET_MEALS_FAILED:
      return {
        ...state,
        userMeals: [],
      };

    case ActionType.GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
      };
    case ActionType.GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredients: [],
      };

    default:
      return state;
  }
};

export default reducer;
