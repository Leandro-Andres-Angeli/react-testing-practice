import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoReducer from './todoSlice';

const defaultAuthState = {
  token: null,
  loading: false,
  error: null,
};

const defaultTodosState = {
  items: [],
  status: 'idle',
  savingId: null,
};

export const setupStore = (preloadedState = {}) => {
  const mergedState = {
    auth: { ...defaultAuthState, ...(preloadedState?.auth || {}) },
    todos: { ...defaultTodosState, ...(preloadedState?.todos || {}) },
  };

  return configureStore({
    reducer: { auth: authReducer, todos: todoReducer },
    preloadedState: mergedState,
  });
};

export const store = setupStore();