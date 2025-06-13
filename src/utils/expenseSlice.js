import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: { expenses: [] },
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    }
  }
});

export const { setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;