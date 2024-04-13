import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface SearchState {
  history: string[];
}

// Define the initial state using that type
const initialState: SearchState = {
  history: [],
};

const searchSlice = createSlice({
  name: "search",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action) => {
      state.history.unshift(action.payload);
      if (state.history.length > 20) state.history.length = 20;
    },
  },
});

export const { add } = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHistory = (state: RootState) => state.search.history;

export default searchSlice.reducer;
