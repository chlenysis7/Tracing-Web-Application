import { createSlice } from "@reduxjs/toolkit";

// See App.tsx
const isMobileSlice = createSlice({
  name: "isMobile",
  initialState: window.innerWidth <= 768,
  reducers: {
    setWidth(_, { payload }) {
      return payload;
    },
  },
});

export const isMobileActions = isMobileSlice.actions;

export default isMobileSlice.reducer;
