import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { period: 'monthly' },
  reducers: {
    setPeriod(state, action) {
      state.period = action.payload;
    }
  }
});


export const { setPeriod } = dashboardSlice.actions;
export default dashboardSlice.reducer;