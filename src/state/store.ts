import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import mainMiddleware from '../middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainMiddleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
