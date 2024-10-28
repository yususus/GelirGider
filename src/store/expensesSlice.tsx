import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpenseState {
  incomes: { category: string; amount: string }[];
  expenses: { category: string; amount: string }[];
}

const initialState: ExpenseState = {
  incomes: [],
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<{ category: string; amount: string }>) => {
      state.incomes.push(action.payload);
    },
    addExpense: (state, action: PayloadAction<{ category: string; amount: string }>) => {
      state.expenses.push(action.payload);
    },
  },
});

export const { addIncome, addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
