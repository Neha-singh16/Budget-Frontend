

import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budgets: [],
  },
  reducers: {
    setBudgets: (state, action) => {
      state.budgets = action.payload;
    },
    addBudget: (state, action) => {
      state.budgets.push(action.payload);
    },
    deleteBudget: (state, action) => {
      state.budgets = state.budgets.filter(b => b._id !== action.payload);
    },
  },
});

export const { setBudgets, addBudget, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
