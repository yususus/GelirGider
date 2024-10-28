import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Investment {
  currency: string;
  rate: string;
  amount: string;
}

interface InvestmentState {
  investments: Investment[];
}

const initialState: InvestmentState = {
  investments: [],
};

const investmentSlice = createSlice({
  name: 'investment',
  initialState,
  reducers: {
    addInvestment: (state, action: PayloadAction<Investment>) => {
      state.investments.push(action.payload);
    },
    clearInvestments: (state) => {
      state.investments = [];
    },
  },
});

export const { addInvestment, clearInvestments } = investmentSlice.actions;

export default investmentSlice.reducer;
