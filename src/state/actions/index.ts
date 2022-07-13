import { ActionType } from '../action-types';
import { IIngredient, IMeal } from '../meal';
import { IWeight, IUser, IDailyIntake, IregisterInfo } from '../user';

export interface setLoadingOnAction {
  type: ActionType.SET_LOADING_ON;
}

export interface setLoadingOffAction {
  type: ActionType.SET_LOADING_OFF;
}

export interface loggingInAction {
  type: ActionType.LOG_IN;
}

export interface logOutInAction {
  type: ActionType.LOG_OUT;
}

export interface logInSuccessAction {
  type: ActionType.LOG_IN_SUCCESS;
  payload: IUser;
}

export interface logInFailedAction {
  type: ActionType.LOG_IN_FAILED;
  payload: string;
}

export interface getMealsAction {
  type: ActionType.GET_MEALS;
  payload: number;
}

export interface getMealsSuccessAction {
  type: ActionType.GET_MEALS_SUCCESS;
  payload: IMeal[];
}

export interface getMealsFailedAction {
  type: ActionType.GET_MEALS_FAILED;
  payload: string;
}

export interface getIngredientsAction {
  type: ActionType.GET_INGREDIENTS;
}

export interface getIngredientsSuccessAction {
  type: ActionType.GET_INGREDIENTS_SUCCESS;
  payload: IIngredient[];
}

export interface getIngredientsFailedAction {
  type: ActionType.GET_INGREDIENTS_FAILED;
}

export interface getWeightsAction {
  type: ActionType.GET_WEIGHTS;
  payload: number;
}

export interface getWeightsSuccessAction {
  type: ActionType.GET_WEIGHTS_SUCCESS;
  payload: IWeight[];
}

export interface getDailyAction {
  type: ActionType.GET_DAILY;
  payload: number;
}

export interface updateDailyAction {
  type: ActionType.UPDATE_DAILY;
  payload: IDailyIntake;
}

export interface updateActivityAction {
  type: ActionType.UPDATE_ACTIVITY;
  payload:
    | 'sédentaire'
    | 'activité légère'
    | 'activité modérée'
    | 'activité intense';
}

export interface updateUsernameAction {
  type: ActionType.UPDATE_USERNAME;
  payload: {
    username: string;
  };
}

export interface updateAgeAction {
  type: ActionType.UPDATE_AGE;
  payload: {
    age: number;
  };
}

export interface updateAgeSuccessAction {
  type: ActionType.UPDATE_AGE_SUCCESS;
  payload: {
    age: number;
  };
}

export interface updateUsernameSuccessAction {
  type: ActionType.UPDATE_USERNAME_SUCCESS;
  payload: {
    username: string;
  };
}

export interface updateActivitySuccessAction {
  type: ActionType.UPDATE_ACTIVITY_SUCCESS;
  payload: {
    activity:
      | 'sédentaire'
      | 'activité légère'
      | 'activité modérée'
      | 'activité intense';
  };
}

export interface registerAction {
  type: ActionType.REGISTER;
  payload: IregisterInfo;
}

export interface registerSuccessAction {
  type: ActionType.REGISTER_SUCCESS;
  payload: string;
}

export interface registerFailedAction {
  type: ActionType.REGISTER_FAILED;
  payload: string;
}

export type Action =
  | setLoadingOnAction
  | setLoadingOffAction
  | loggingInAction
  | logOutInAction
  | getMealsAction
  | getMealsSuccessAction
  | getMealsFailedAction
  | getIngredientsAction
  | getIngredientsSuccessAction
  | getWeightsAction
  | getWeightsSuccessAction
  | getIngredientsFailedAction
  | getDailyAction
  | logInSuccessAction
  | logInFailedAction
  | updateActivityAction
  | updateUsernameAction
  | updateAgeAction
  | updateDailyAction
  | updateAgeSuccessAction
  | updateUsernameSuccessAction
  | updateActivitySuccessAction
  | registerAction
  | registerSuccessAction
  | registerFailedAction;
