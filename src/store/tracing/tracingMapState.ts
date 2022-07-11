import { createSlice } from "@reduxjs/toolkit";

const tracingMapStateSlice = createSlice({
  name: "tracing-mapState",
  initialState: null,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const tracingMapStateActions = tracingMapStateSlice.actions;

export default tracingMapStateSlice.reducer;
