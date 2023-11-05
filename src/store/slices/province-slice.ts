import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { ProvinceType } from '../../types/ProvinceType';

// Define a type for the slice state
interface ProvinceState {
  value: ProvinceType[];
}

// Define the initial state using that type
const initialState: ProvinceState = {
  value: [],
};

export const citySlice = createSlice({
  name: 'province',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveProvince: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { saveProvince } = citySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCities = (state: RootState) => state.provinces.value;

export default citySlice.reducer;
