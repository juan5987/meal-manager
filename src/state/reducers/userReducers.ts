import { ActionType } from '../action-types';
import { Action } from '../actions';
import { IUser, IDailyIntake, IWeight } from '../user';

export interface UserState {
  isLogged: boolean;
  loading: boolean;
  user: IUser | {};
  dailyIntake: IDailyIntake | {};
  weight: IWeight[] | [];
}

const initialState: UserState = {
  isLogged: false,
  loading: false,
  user: {},
  dailyIntake: {},
  weight: [],
};

const reducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
