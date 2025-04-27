// store/index.ts
'use client'
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fruitReducer from './slices/fruitSlice';
import createReducer from './slices/cartSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
    fruit : fruitReducer,
    cart : createReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
