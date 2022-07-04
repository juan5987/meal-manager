import { ActionType } from '../action-types';
import { Action } from '../actions';
import { IUser, IDailyIntake, IWeight } from '../user';

export interface UserState {
  isLogged: boolean;
  loading: boolean;
  user: IUser | {};
  dailyIntake: IDailyIntake | {};
  weight: IWeight[] | [];
  loggingErrorMsg: string;
}

const initialState: UserState = {
  isLogged: false,
  loading: false,
  user: {},
  dailyIntake: {},
  weight: [],
  loggingErrorMsg: '',
};

const reducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionType.SET_LOADING_ON:
      return {
        ...state,
        loading: true,
      };
    case ActionType.SET_LOADING_OFF:
      return {
        ...state,
        loading: false,
      };
    case ActionType.LOG_IN:
      return {
        ...state,
        isLogged: true,
      };
    case ActionType.LOG_OUT:
      return {
        ...state,
        isLogged: false,
      };
    case ActionType.LOG_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        loggingErrorMsg: '',
      };
    case ActionType.LOG_IN_FAILED:
      return {
        ...state,
        isLogged: false,
        loading: false,
        loggingErrorMsg: action.payload,
      };
    case ActionType.GET_WEIGHTS_SUCCESS:
      return {
        ...state,
        loading: false,
        weight: action.payload,
      };
    case ActionType.UPDATE_DAILY:
      return {
        ...state,
        dailyIntake: action.payload,
        isLogged: true,
      };
    default:
      return state;
  }
};

export default reducer;
