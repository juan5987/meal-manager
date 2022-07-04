import { ActionType } from '../action-types';
import { IUser } from '../user';

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
