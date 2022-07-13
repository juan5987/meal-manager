import axios from 'axios';
import { Middleware } from 'redux';
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
  updateActivitySuccess,
  updateUsernameSuccess,
  updateAgeSuccess,
  register_success,
  register_failed,
  addWeight,
  addDaily,
} from '../state/action-creators';
import { calculateDailyIntake } from '../utils/dailyIntake';
import { sortByDate } from '../utils/sort';

const mainMiddleware: Middleware = (store) => (next) => (action) => {
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

    case ActionType.UPDATE_ACTIVITY: {
      const state = store.getState();
      axios({
        url: `http://localhost:3001/profil/${state.user.user.id}/activity`,
        method: 'put',
        data: action.payload,
      })
        .then((response) => {
          store.dispatch(updateActivitySuccess(action.payload.activity));
        })
        .catch((error) => console.log(error));
      break;
    }

    case ActionType.UPDATE_USERNAME: {
      const state = store.getState();
      axios({
        url: `http://localhost:3001/profil/${state.user.user.id}/username`,
        method: 'put',
        data: action.payload,
      })
        .then((response) => {
          store.dispatch(updateUsernameSuccess(action.payload.username));
        })
        .catch((error) => console.log(error));
      break;
    }

    case ActionType.UPDATE_AGE: {
      const state = store.getState();
      axios({
        url: `http://localhost:3001/profil/${state.user.user.id}/age`,
        method: 'put',
        data: action.payload,
      })
        .then((response) => {
          store.dispatch(updateAgeSuccess(action.payload.age));
        })
        .catch((error) => console.log(error));
      break;
    }
    case ActionType.REGISTER: {
      store.dispatch(setLoadingOn());
      axios({
        method: 'post',
        url: `http://localhost:3001/register`,
        data: {
          username: action.payload.username,
          email: action.payload.email,
          emailConfirm: action.payload.emailConfirm,
          password: action.payload.password,
          passwordConfirm: action.payload.passwordConfirm,
          height: action.payload.height,
          age: action.payload.age,
          sex: action.payload.sex,
          activity: action.payload.activity,
        },
      })
        .then((response) => {
          store.dispatch(
            addWeight({
              weight: action.payload.weight,
              goal: action.payload.goal,
              date: action.payload.date,
              user_id: response.data.id,
            })
          );
          store.dispatch(
            addDaily(
              response.data.id,
              calculateDailyIntake(
                action.payload.weight,
                action.payload.height,
                action.payload.age,
                action.payload.sex,
                action.payload.activity
              )
            )
          );
          store.dispatch(register_success(response.data.message));
        })
        .catch((error) =>
          store.dispatch(register_failed(error.response.data.message))
        );
      break;
    }

    default:
      next(action);
      break;
  }
};

export default mainMiddleware;
