import mealsReducers from './mealsReducers';
import planningReducers from './planningReducers';
import userReducers from './userReducers';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  meals: mealsReducers,
  planning: planningReducers,
  user: userReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
