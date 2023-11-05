import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { CityType } from '../../types/CityType';

// Define a type for the slice state
interface CityState {
  value: CityType[];
}

// Define the initial state using that type
const initialState: CityState = {
  value: [],
};

export const citySlice = createSlice({
  name: 'city',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveCities: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { saveCities } = citySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCities = (state: RootState) => state.cities.value;

export default citySlice.reducer;
