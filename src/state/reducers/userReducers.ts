import { ActionType } from '../action-types';
import { Action } from '../actions';
import { IUser, IDailyIntake, IWeight } from '../user';

export interface UserState {
  isLogged: boolean;
  loading: boolean;
  user: IUser;
  dailyIntake: IDailyIntake | {};
  weight: IWeight[] | [];
  loggingErrorMsg: string;
}

const initialState: UserState = {
  isLogged: false,
  loading: false,
  user: {
    id: 0,
    age: 0,
    height: 0,
    sex: '',
    username: '',
    email: '',
    activity: '',
    token: '',
  },
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

    case ActionType.UPDATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          activity: action.payload.activity,
        },
      };
    case ActionType.UPDATE_USERNAME_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
        },
      };
    case ActionType.UPDATE_AGE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          age: action.payload.age,
        },
      };

    default:
      return state;
  }
};

export default reducer;
