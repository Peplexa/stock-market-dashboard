// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../redux/stockSlice';

export const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});
