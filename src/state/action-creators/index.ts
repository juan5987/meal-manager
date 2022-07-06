import { ActionType } from '../action-types';
import { IMeal, IIngredient } from '../meal';
import { IUser, IWeight, IDailyIntake } from '../user';
import {
  getMealsAction,
  getMealsSuccessAction,
  getMealsFailedAction,
  getIngredientsAction,
  getIngredientsSuccessAction,
} from '../actions';

export const loggingIn = (email: string, password: string) => {
  return {
    type: ActionType.LOG_IN,
    payload: {
      email,
      password,
    },
  };
};

export const loggingSuccess = (user: IUser) => {
  return {
    type: ActionType.LOG_IN_SUCCESS,
    payload: user,
  };
};

export const loggingFailed = (errorMsg: string) => {
  return {
    type: ActionType.LOG_IN_FAILED,
    payload: errorMsg,
  };
};

export const setLoadingOn = () => {
  return {
    type: ActionType.SET_LOADING_ON,
  };
};

export const getMeals = (userId: number): getMealsAction => {
  return {
    type: ActionType.GET_MEALS,
    payload: userId,
  };
};

export const getMealsSuccess = (meals: IMeal[]): getMealsSuccessAction => {
  return {
    type: ActionType.GET_MEALS_SUCCESS,
    payload: meals,
  };
};

export const getMealsFailed = (errorMsg: string): getMealsFailedAction => {
  return {
    type: ActionType.GET_MEALS_FAILED,
    payload: errorMsg,
  };
};

export const getIngredients = (): getIngredientsAction => {
  return {
    type: ActionType.GET_INGREDIENTS,
  };
};

export const getIngredientsSuccess = (
  ingredients: IIngredient[]
): getIngredientsSuccessAction => {
  return {
    type: ActionType.GET_INGREDIENTS_SUCCESS,
    payload: ingredients,
  };
};

export const getIngredientsFailed = () => {
  return {
    type: ActionType.GET_INGREDIENTS_FAILED,
  };
};

export const getWeights = (userId: number) => {
  return {
    type: ActionType.GET_WEIGHTS,
    payload: userId,
  };
};

export const getWeightsSuccess = (weights: IWeight[]) => {
  return {
    type: ActionType.GET_WEIGHTS_SUCCESS,
    payload: weights,
  };
};

export const getDaily = (userId: number) => {
  return {
    type: ActionType.GET_DAILY,
    payload: userId,
  };
};

export const updateDaily = (daily: IDailyIntake) => {
  return {
    type: ActionType.UPDATE_DAILY,
    payload: daily,
  };
};

export const updateActivity = (activity: string) => {
  return {
    type: ActionType.UPDATE_ACTIVITY,
    payload: {
      activity,
    },
  };
};

export const updateUsername = (username: string) => {
  return {
    type: ActionType.UPDATE_USERNAME,
    payload: {
      username,
    },
  };
};

export const updateAge = (age: number) => {
  return {
    type: ActionType.UPDATE_AGE,
    payload: {
      age,
    },
  };
};

export const updateAgeSuccess = (age: number) => {
  return {
    type: ActionType.UPDATE_AGE_SUCCESS,
    payload: {
      age,
    },
  };
};

export const updateUsernameSuccess = (username: string) => {
  return {
    type: ActionType.UPDATE_USERNAME_SUCCESS,
    payload: { username },
  };
};

export const updateActivitySuccess = (
  activity:
    | 'sédentaire'
    | 'activité légère'
    | 'activité modérée'
    | 'activité intense'
) => {
  return {
    type: ActionType.UPDATE_ACTIVITY_SUCCESS,
    payload: {
      activity,
    },
  };
};
