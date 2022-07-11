import { createSlice } from "@reduxjs/toolkit";

const tracingSearchFormExpandedSlice = createSlice({
  name: "tracing-searchFormExpanded",
  initialState: true,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const tracingSearchFormExpandedActions = tracingSearchFormExpandedSlice.actions;

export default tracingSearchFormExpandedSlice.reducer;