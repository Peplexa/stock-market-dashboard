// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './stockSlice';

export const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});