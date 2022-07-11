import { createSlice } from "@reduxjs/toolkit";

// See App.tsx
export interface ILoginState {
  username?: string;
  password?: string;
}

const initialState: ILoginState = {
  username: undefined,
  password: undefined,
};

const loginStateSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setLoginState(_, { payload }) {
      return payload;
    },
  }
});

export const loginStateActions = loginStateSlice.actions;

export default loginStateSlice.reducer;
