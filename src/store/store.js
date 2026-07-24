import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoReducer from './todoSlice';

export const setupStore = (preloadedState) => configureStore({
  reducer: { auth: authReducer, todos: todoReducer },
  preloadedState
});
export const store = setupStore();