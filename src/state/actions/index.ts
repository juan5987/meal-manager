import { ActionType } from '../action-types';
import { IMeal, IIngredient, INutrition } from '../meal';
import { IDailyIntake, IUser, IWeight } from '../user';

export interface loggingInAction {
  type: ActionType.LOGGING_IN;
}

export interface logOutInAction {
  type: ActionType.LOG_OUT;
}

export type Action = loggingInAction | logOutInAction;
