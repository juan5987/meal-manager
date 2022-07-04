import axios from 'axios';
import { ActionType } from '../state/action-types';
import {
  loggingSuccess,
  loggingFailed,
  setLoadingOn,
  getMeals,
  getMealsSuccess,
  getMealsFailed,
  getIngredients,
  getIngredientsSuccess,
  getIngredientsFailed,
  getWeights,
  getWeightsSuccess,
  getDaily,
  updateDaily,
} from '../state/action-creators';
import { sortByDate } from '../utils/sort';

const mainMiddleware = (store: any) => (next: any) => (action: any) => {
  switch (action.type) {
    case ActionType.LOG_IN: {
      store.dispatch(setLoadingOn());

      axios({
        method: 'post',
        url: `http://localhost:3001/login`,
        data: {
          email: action.payload.email,
          password: action.payload.password,
          stayConnected: action.payload.stayConnected,
        },
      })
        .then((response) => {
          const user = { ...response.data };
          localStorage.setItem('id', user.id);
          localStorage.setItem('username', user.username);
          localStorage.setItem('email', user.email);
          localStorage.setItem('token', user.token);
          localStorage.setItem('stayConnected', user.stayConnected);
          delete user.token;
          store.dispatch(loggingSuccess(user));
          store.dispatch(getMeals(user.id));
          store.dispatch(getIngredients());
          store.dispatch(getWeights(user.id));
          store.dispatch(getDaily(user.id));
        })
        .catch((error) => {
          store.dispatch(loggingFailed(error.response.data.message));
        });

      break;
    }
    case ActionType.GET_MEALS: {
      store.dispatch(setLoadingOn());
      axios(`http://localhost:3001/meals/${action.payload}`)
        .then((response) => {
          store.dispatch(getMealsSuccess(response.data));
        })
        .catch((error) => {
          store.dispatch(getMealsFailed(error.response.data.message));
        });
      break;
    }
    case ActionType.GET_INGREDIENTS: {
      const state = store.getState();

      axios('http://localhost:3001/ingredients')
        .then((response) => {
          store.dispatch(getIngredientsSuccess(response.data));
        })
        .catch((error) => {
          store.dispatch(getIngredientsFailed());
        });
      break;
    }
    case ActionType.GET_WEIGHTS: {
      const state = store.getState();
      axios(`http://localhost:3001/user/${state.user.user.id}/weight`)
        .then((response) => {
          const orderedWeights = response.data.sort(sortByDate);
          store.dispatch(getWeightsSuccess(orderedWeights));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }

    case ActionType.GET_DAILY: {
      axios(`http://localhost:3001/daily/${action.payload}`)
        .then((response) => {
          store.dispatch(
            updateDaily({
              calorie: response.data.calorie,
              proteinPC: Math.round(
                ((response.data.protein * 100) / response.data.calorie) * 4
              ),
              protein: response.data.protein,
              carbohydratePC: Math.round(
                ((response.data.carbohydrate * 100) / response.data.calorie) * 4
              ),
              carbohydrate: response.data.carbohydrate,
              lipidPC: Math.round(
                ((response.data.lipid * 100) / response.data.calorie) * 9
              ),
              lipid: response.data.lipid,
              fiber: response.data.fiber,
            })
          );
        })
        .catch((error) => console.log(error));
      break;
    }

    default:
      next(action);
      break;
  }
};

export default mainMiddleware;
