import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store"; // Define a type for the slice state

// Define a type for the slice state
interface UserState {
  user: { username: string; password: string } | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
