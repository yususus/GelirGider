import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './expensesSlice';
import investmentReducer from './investmentSlice';


const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    investment: investmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
