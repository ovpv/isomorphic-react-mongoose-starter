import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const HomeSlice: any = createSlice({
  name: 'homeReducer',
  initialState: {},
  reducers: {},
});

// export const {} = HomeSlice.actions;

const HomeReducer = HomeSlice.reducer;

export default HomeReducer;
